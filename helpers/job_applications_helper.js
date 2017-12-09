

var JobApplicationsHelper = {};


JobApplicationsHelper.jobApplicationsPath = () => '/job_applications';
JobApplicationsHelper.jobApplicationPath = (id) => `/job_applications/${ id }`;
JobApplicationsHelper.newJobApplicationPath = (id) => `/job_applications/new`;
JobApplicationsHelper.editJobApplicationPath = (id) => `/job_applications/${ id }/edit`;
JobApplicationsHelper.destroyJobApplicationPath = (id) => `/job_applications/${ id }?_method=delete`;




module.exports = JobApplicationsHelper;





