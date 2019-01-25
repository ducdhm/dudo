module.exports = dashboardController = {
    showDashboard: async (req, res, next) => {
        try {
            return res.render('dashboard/index', {
                title: 'Trang chủ'
            });
        } catch (error) {
            return next(error);
        }
    }
};
