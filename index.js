let data = [];
axios.get('http://localhost:3000/stock')
    .then((response) => {
        const barang = document.getElementById("listBarang")
        data = response.data;
        console.log(data);

        response.data.forEach(item => {
            const {
                id,
                name,
                quantity,
                price
            } = item;

            //input html
            const itemHTML = `
        <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${quantity}</td>
        <td>${price}</td>
        <td>
        <button onclick="ganti(${id})"class="btn btn-outline-primary"><i class="fa fa-pencil-square">&nbsp;&nbsp;Change</button></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp
        <button onclick="hapus(${id})" class="btn btn-outline-danger"><i class="fa fa-ban">&nbsp;&nbsp;Delete</button></i>
        </td>
        </tr>`;
            barang.innerHTML += itemHTML;
        })
    })
    .catch((pesanError) => {
        console.log(pesanError);
    })
document.getElementById('simpan').addEventListener('click', function (event) {

    const name = document.getElementById('name').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const data = {
        name: name,
        quantity: quantity,
        price: price
    }
    axios.post('http://localhost:3000/stock', data).then(response => {
        console.log(response);
        window.alert('Barang berhasil di tambah');
    }).catch(err => {
        console.error(err);
    });
});
const hapus = id => {
    axios.delete(`http://localhost:3000/stock/${id}`)
}
const ganti = id => {
    const stock = data.find(item => {
        return item === id
    })
    if (stock) {
        const id = window.prompt('Id', stock.id);
        const name = window.prompt('Name', stock.name);
        const price = window.prompt('Price', stock.price);
        const quantity = window.prompt('Quantity', stock.quantity);
        axios.put(`http://localhost:3000/stock/${quantity}`, {
            id,
            name,
            price,
            quantity
        });
    }
}