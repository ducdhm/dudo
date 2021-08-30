module.exports = (app, Model, originItemPerPage = app.config.paginator.itemPerPage) => {
    return {
        get: async (query, page, itemPerPage, improveQueryBuild) => {
            let currentPage = isNaN(page) ? 1 : +page;

            if (!itemPerPage) {
                itemPerPage = originItemPerPage;
            }

            if (typeof itemPerPage === 'function') {
                improveQueryBuild = itemPerPage;
                itemPerPage = originItemPerPage;
            }

            let queryBuilder = Model.find(query);
            if (typeof improveQueryBuild === 'function') {
                queryBuilder = improveQueryBuild(queryBuilder);
            }

            const totalRecord = await Model.countDocuments(query);
            const totalPage = Math.ceil(totalRecord / itemPerPage);
            const data = await queryBuilder.skip((itemPerPage * currentPage) - itemPerPage).limit(itemPerPage);

            return {
                data,
                totalRecord,
                totalPage,
                currentPage,
            }
        },
    };
};
