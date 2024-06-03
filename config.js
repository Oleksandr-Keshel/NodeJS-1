require('dotenv').config();
const config = {
    enableScheduleJobs: process.env.ENABLE_SCHEDULE_JOBS || true,
};

module.exports = config;