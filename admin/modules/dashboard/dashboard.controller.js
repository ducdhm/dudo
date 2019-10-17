module.exports = (app) => {
    const dashboardController = {};
    dashboardController.showDashboard = async (req, res, next) => {
        try {
            return res.render('dashboard/index', {
                title: 'Dashboard'
            });
        } catch (error) {
            return next(error);
        }
    };
    
    return dashboardController;
};
