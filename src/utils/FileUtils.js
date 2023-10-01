
export default {
  /**
   * 下載檔案
   * https://stackoverflow.com/a/18197341/6645399
   * @param {String} filename
   * @param {String} text
   * @returns {Boolean}
   */
  download: function (filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

    return true
  },
  downloadODS: function (filename, array) {
    //console.log(window.XLSX)
    var wb = XLSX.utils.book_new();
    console.log(array)
    wb.SheetNames.push("data")
    wb.Sheets["data"] = XLSX.utils.aoa_to_sheet(array)

    var wbout = XLSX.write(wb, {bookType: 'ods', type: 'binary'})
    if (!filename.endsWith('.ods')) {
      filename = filename + '.ods'
    }
    
    saveAs(new Blob([this.s2ab(wbout)], {type: "application/octet-stream"}), filename);
  },
  downloadXLS: function (filename, array) {
    //console.log(window.XLSX)
    var wb = XLSX.utils.book_new();
    // console.log(array)
    wb.SheetNames.push("data")
    wb.Sheets["data"] = XLSX.utils.aoa_to_sheet(array)

    var wbout = XLSX.write(wb, {bookType: 'xls', type: 'binary'})
    if (!filename.endsWith('.xls')) {
      filename = filename + '.xls'
    }
    
    saveAs(new Blob([this.s2ab(wbout)], {type: "application/octet-stream"}), filename);
  },
  s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++)
      view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
  },
  downloadZippedXLS: function (filename, array) {
    //console.log(window.XLSX)
    var wb = XLSX.utils.book_new();
    // console.log(array)
    wb.SheetNames.push("data")
    wb.Sheets["data"] = XLSX.utils.aoa_to_sheet(array)

    var wbout = XLSX.write(wb, {bookType: 'xls', type: 'base64'})
    if (!filename.endsWith('.xls')) {
      filename = filename + '.xls'
    }

    var zip = new JSZip();
    zip.file(filename, wbout, {base64: true});
    // var img = zip.folder("images");
    // img.file("smile.gif", imgData, {base64: true});


    // if (!filename.endsWith('.zip')) {
    //   filename = filename + '.zip'
    // }


    zip.generateAsync({type:"blob"})
    .then(function(content) {
        // see FileSaver.js
        saveAs(content, filename + ".zip");
    });
  },
}