const CronJob = require('cron').CronJob;
const userModel = require('../models/user.model');
const { stringify } = require('csv-stringify/sync');
const fs = require('fs');

function startUserLoginReminderJob() {
    const job = new CronJob(
        '0 30 7 * * 2', // At 07:30 on Tuesday
        async () => {
            const date = new Date();
            date.setDate(date.getDate() - 7);

            const users = await userModel.find({
                $or: [
                    { lastLoginAt: { $exists: false} },
                    { lastLoginAt: { $lt: date } }
            ]});

            users.forEach(user => {
                console.log(`[userLoginReminder.job] Todo send reminder email for: ${user.email}`);
            });

            const columns = {
                id: 'id',
                email: 'Email'
            };
            const rows = users.map(user => ([user.id, user.email]));
            try {
                const data = await stringify([
                    columns,
                    ...rows
                ], {
                    delimiter: ';'
                });
                await fs.writeFileSync(`public/${Date.now()}.csv`, data);
            } catch (err) {
                console.error(err);
            }
        },
    );

    job.start();
}

module.exports = startUserLoginReminderJob;