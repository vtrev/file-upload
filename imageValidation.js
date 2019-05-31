isValidImage = (fileName) => {

    let validImageTypes = ['jpg','jpeg','bmp','png'];

    let checkType = (type)=>{
        return fileName.endsWith(type);
    }

    return validImageTypes.some(checkType)
  }
  

module.exports = isValidImage;