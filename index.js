
const downloadBtn = document.querySelector('#submit');

downloadBtn.addEventListener("click", e => {
    e.preventDefault();
    downloadBtn.innerText = "Downloading file...";
    fetchFile(fileInput.value);
});
const excelchange = (event) => {
    const selectedFile = event.target.files[0]
    const reader = new FileReader();
    reader.onload = function(event) {
        const data = event.target.result;
        const workbook = XLSX.read(data, {
            type: 'binary'
        });
        workbook.SheetNames.forEach(function(sheetName) {
                        
            const XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            fetchSelectCustomers(XL_row_object)
            fetchSelectVersions(XL_row_object)
          })
      };
      reader.onerror = function(event) {
        console.error("File could not be read! Code " + event.target.error.code);
      };
      reader.readAsBinaryString(selectedFile);

}


function alertScreen(){
    const urlData = document.getElementById('url').value;
    const customerData = document.getElementById('customerNo').value;
    const versionData = document.getElementById('versionNo').value;
    fetchFile(urlData+ '/' +customerData+ '/'+versionData)
}
async function  fetchSelectCustomers(data){
    const customerSelection = document.querySelector('#customerNo');
    console.log(data)
    data.forEach(element => {
        const option = document.createElement('option');
        option.value= element["CM Nbr"]
        option.innerText= element["CM Nbr"]
        customerSelection.appendChild(option)
    });

}

async function  fetchSelectVersions(data){
    const VersionSelection = document.querySelector('#versionNo');
    data.forEach(element => {
        
        const option = document.createElement('option');
        option.value= element["CM Nbr"]
        option.innerText= element["CM Nbr"]
        VersionSelection.appendChild(option)
    });

}
function fetchFile(url) {
    fetch(url).then(res => res.blob()).then(file => {
        let tempUrl = URL.createObjectURL(file);
        const aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag);
        aTag.click();
        downloadBtn.innerText = "Download File";
        URL.revokeObjectURL(tempUrl);
        aTag.remove();
    }).catch(() => {
        alert("Failed to download file!");
        downloadBtn.innerText = "Download File";
    });
}