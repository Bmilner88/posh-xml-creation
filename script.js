const createButton = document.querySelector('#create-btn');

function downloadHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    if(document.querySelector('#download')) {
        document.querySelector('#download').remove();
    }

    const groupId = document.querySelector('#group-id');
    const customers = document.querySelector('#customer-num').value.split('\n');

    if(!groupId.value || !customers.length) {
        alert('Please fill out form')
        return;
    };
    
    const customerArray = [];
    customers.forEach(function(i, idx, arr){
        if(idx === arr.length - 1) {
            customerArray.push(`   <group-assignment group-id="${groupId.value}" customer-no="${i}" />`)
        } else {
            customerArray.push(`   <group-assignment group-id="${groupId.value}" customer-no="${i}" />\n`);
        };
    });

    const filename = `${groupId.value}.xml`;
    const xmltext = `<?xml version="1.0" encoding="UTF-8"?>
<customer-groups xmlns="http://www.demandware.com/xml/impex/customergroup/2007-06-30">
<customer-group group-id="${groupId.value}">
<custom-attributes/>
</customer-group>
${customerArray.join('')}
</customer-groups>   
`
    let download = document.createElement('a');
    let bb = new Blob([xmltext], {type: 'text/plain'});

    download.setAttribute('id', 'download')
    download.setAttribute('href', window.URL.createObjectURL(bb));
    download.setAttribute('download', filename);
    download.innerText = 'Click here to download';

    download.dataset.downloadurl = ['text/plain', download.download, download.href].join(':');
    download.draggable = true; 
    download.classList.add('dragout');

    document.body.appendChild(download)
};
 
document.querySelector('#xml-form').addEventListener('submit', downloadHandler);