var express = require('express');
var router = express.Router();
var models = require('./../models');
var {
  User,
  Profile,
  Address,
  State,
  Education,
  Skill,
  JobApplication
} = models;
var h = require('./../helpers');
var sequelize = models.sequelize;


// ----------------------------------------
// Index
// ----------------------------------------
var onIndex = (req, res) => {
  JobApplication.findAll()
    .then((jobApplications) => {
      res.render('job_applications/index', { jobApplications });
    })
    .catch((e) => res.status(500).send(e.stack));
};
router.get('/', onIndex);
router.get('/job_applications', onIndex);


// ----------------------------------------
// New
// ----------------------------------------
router.get('/job_applications/new', (req, res) => {
  State.findAll({})
    .then((states) => {
      res.render('job_applications/new', { states });
    })
    .catch((e) => res.status(500).send(e.stack));
});


// ----------------------------------------
// Show
// ----------------------------------------
router.get('/job_applications/:id', (req, res) => {
  JobApplication.findById(req.params.id, {
    // include: [
    //   {
    //     model: User,
    //     include: [
    //       {
    //         model: Profile,
    //         include: [{ model: Address }]
    //       },
    //       { model: Education },
    //       { model: Skill }
    //     ]
    //   },
    // ]
    include: [{ all: true, include: [{ all: true }] }]
  })
    .then((jobApplication) => {
      res.render('job_applications/show', { jobApplication });
    })
    .catch((e) => res.status(500).send(e.stack));
});


// ----------------------------------------
// Create
// ----------------------------------------
router.post('/job_applications', (req, res) => {

  // Hoist variables to be used later
  var user;
  var profile;
  var educations;
  var skills;
  var jobApplication;

  // Filter params
  var userParams = {
    fname: req.body.user.fname,
    lname: req.body.user.lname,
    email: req.body.user.email
  };
  var profileParams = {
    birthday: sequelize.fn('DATE', [
      req.body.user.profile.birthday.year,
      req.body.user.profile.birthday.month,
      req.body.user.profile.birthday.day
    ].join('-')),
    gender: req.body.user.profile.gender
  };
  var addressParams = {
    street: req.body.user.profile.address.street,
    city: req.body.user.profile.address.city,
    stateId: req.body.user.profile.address.state_id
  };
  var educationsParams = req.body.user.educations.map((education) => {
    return {
      name: education.name,
      type: education.type
    };
  });
  var skillsParams = req.body.user.skills.map((skill) => {
    return {
      name: skill
    };
  });
  var jobApplicationParams = {
    desiredPosition: req.body.job_application.desired_position,
    currentlyEmployed: req.body.job_application.currently_employed
  };

  // Begin transaction
  sequelize.transaction((t) => {

    // Don't create a user if
    // already exists
    return User.findOrCreate({
      defaults: userParams,
      where: { email: userParams.email },
      transaction: t
    })

      // Array returned from findOrCreate
      // so must use `spread`
      .spread((result) => {

        // Set user
        user = result;

        // Add userId to associated models
        profileParams.userId = user.id;
        educationsParams.forEach((ep) => { ep.userId = user.id; });
        skillsParams.forEach((sp) => { sp.userId = user.id });
        jobApplicationParams.userId = user.id;

        // Find or create user profile
        return Profile.findOrCreate({
          defaults: profileParams,
          where: { userId: user.id },
          transaction: t
        });
      })

      // Array returned so spread
      .spread((result) => {

        // Set profile
        profile = result;

        // Set profileId for associations
        user.profileId = profile.id;
        addressParams.profileId = profile.id;

        // Update user with profileId
        return User.update({ profileId: profile.id }, {
          where: { id: user.id },
          limit: 1,
          transaction: t
        });
      })
      .then(() => {

        // Set address profileId
        addressParams.profileId = profile.id;

        // Find or create address
        return Address.findOrCreate({
          defaults: addressParams,
          where: { profileId: profile.id },
          transaction: t
        });
      })

      // Array returned so spread
      .spread((result) => {

        // Set address
        address = result;

        return Profile.update({ addressId: address.id }, {
          where: { id: profile.id },
          limit: 1,
          transaction: t
        });
      })
      .then(() => {

        // Find or create user educations
        var promises = educationsParams.map((ep) => {
          return Education.findOrCreate({
            defaults: ep,
            where: { name: ep.name, userId: ep.userId },
            transaction: t
          });
        });
        return Promise.all(promises);
      })

      // Manually spread nested arrays
      // and save into variable
      .then((result) => {
        return educations = result.map(r => r[0]);
      })
      .then(() => {

        // Find or create skills
        var promises = skillsParams.map((sp) => {
          return Skill.findOrCreate({
            defaults: sp,
            where: { name: sp.name, userId: sp.userId },
            transaction: t
          });
        });
        return Promise.all(promises);
      })

      // Manually spread nested arrays
      .then((result) => {
        return skills = result.map(r => r[0]);
      })

      // Create new job application
      .then(() => {
        return JobApplication.create(jobApplicationParams, {
          transaction: t
        });
      })

      // Redirect to job application
      .then((result) => {
        req.flash('success', 'Job Application created!');
        jobApplication = result;
        res.redirect(h.jobApplicationPath(jobApplication.id));
      })
      .catch((e) => {
        if (e.errors) {
          e.errors.forEach((err) => req.flash('error', err.message));
          res.render('job_applications/new');
        } else {
          res.status(500).send(e.stack);
        }
      });
  });
});


module.exports = router;
























