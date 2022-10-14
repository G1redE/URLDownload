
const downloadBtn = document.querySelector('#submit');

downloadBtn.addEventListener("click", e => {
    e.preventDefault();
    downloadBtn.innerText = "Downloading file...";
    fetchFile(fileInput.value);
});

function alertScreen(){
    const urlData = document.getElementById('url').value;
    const customerData = document.getElementById('customerNo').value;
    const versionData = document.getElementById('versionNo').value;
    fetchFile(urlData+ '/' +customerData+ '/'+versionData)
}
async function  fetchSelectCustomers(){
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/')
    const data = await res.json()
    const customerSelection = document.querySelector('#customerNo');
    data.forEach(element => {
        const option = document.createElement('option');
        option.value= element.title
        option.innerText= element.title
        customerSelection.appendChild(option)
    });

}
function fetchSelect(){
    fetchSelectCustomers();
    fetchSelectVersions();
}
async function  fetchSelectVersions(){
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/')
    const data = await res.json()
    const VersionSelection = document.querySelector('#versionNo');
    data.forEach(element => {
        const option = document.createElement('option');
        option.value= element.title
        option.innerText= element.title
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