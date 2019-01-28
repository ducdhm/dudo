module.exports = dashboardController = {
    showDashboard: async (req, res, next) => {
        try {
            return res.render('dashboard/index', {
                title: 'Dashboard'
            });
        } catch (error) {
            return next(error);
        }
    }
};
