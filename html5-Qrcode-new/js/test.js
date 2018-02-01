const createXHR = () => {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    const versions = ['MSXML2.XMLHttp', 'Microsoft.XMLHTTP'];
    for (let i = 0, len = versions.length; i < len; i++) {
      try {
        return new ActiveXObject(version[i]);
        break;
      } catch (e) {}
    }
  } else {
    throw new Error('xhr not support');
  }
};
export const fetchImage = (url) => {
  return new Promise((resolve, reject) => {
    if (RegExp(location.host + '|base64,').test(url)) {
      const im = new window.Image();
      im.onload = () => {
        resolve(im);
      };
      im.onerror = () => {
        reject();
      };
      im.src = url;
    } else {
      const xhr = createXHR();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onload = () => {
        const im = new window.Image();
        im.onload = () => {
          resolve(im);
        };
        im.onerror = () => {
          reject();
        };
        im.src = window.URL.createObjectURL(xhr.response);
      };
      xhr.onerror = () => {
        reject();
      };
      xhr.send();
    }
  });
}