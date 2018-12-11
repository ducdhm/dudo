exports.getUploadFileName = (fileName) => {
    let lastDotIndex = fileName.lastIndexOf('.');
    let name = fileName.substring(0, lastDotIndex);
    let extension = fileName.substring(lastDotIndex + 1, fileName.length);
    let timestamp = Date.now();

    return `${name}-${timestamp}.${extension}`;
};

exports.ensureArray = (value) => {
    if (!Array.isArray(value)) {
        return value ? [value] : [];
    }

    return value;
};

exports.checkCategoryStatus = (categoriesList, promotionCategories) => {
    if (Array.isArray(categoriesList) && Array.isArray(promotionCategories)) {
        let promotionCategoryIds = promotionCategories.map((cate) => cate._id.toString());

        categoriesList.forEach((cate) => cate.selected = promotionCategoryIds.includes(cate._id.toString()));
    }

    return categoriesList;
};
