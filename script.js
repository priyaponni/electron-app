

document.addEventListener("DOMContentLoaded", function(event) {
    const { api } = window;
    let list = document.getElementById("list");
    let newTask = document.getElementById("newTask");

    document.getElementById("addTask").addEventListener('click', () => {

        
        console.log('*** inside add tasks');
        list.insertAdjacentHTML('beforeend', `<li class="list-group-item">${newTask.value}</li>`)

        console.log('***api');
        console.log(api);
        api.send("download", {
            payload: {
              fileURL: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg'
            }
          });
        api.send('show-notification', newTask.value);
        newTask.value = '';

    });



    navigator.mediaDevices.getUserMedia({video: true})
        .then(function(stream) {
            document.getElementById('camera').srcObject = stream;
        }).catch(function() {
            alert('could not connect stream');
        });

});

