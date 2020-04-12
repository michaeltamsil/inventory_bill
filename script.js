let data = [];

axios
	.get("http://localhost:3000/stock")
	.then((response) => {
		const barang = document.getElementById("listBarang");
		data = response.data;

		response.data.forEach((item) => {
			const { id, name, quantity, price } = item;

			//input html
			const itemHTML = `
                <tr>
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>${quantity}</td>
                    <td>${price}</td>
                    <td>
                    <button onclick="update(${id})" class="btn btn-outline-primary" > <i class="fa fa-pencil-square"></i> Change </button>
                    <button onclick="deleteData(${id})" class="btn btn-outline-danger"><i class="fa fa-ban"></i> Delete </button>
                    </td>
                </tr>
            `;
			barang.innerHTML += itemHTML;
		});
	})
	.catch((pesanError) => {
		console.log(pesanError);
	});

const deleteData = (id) => {
	axios.delete(`http://localhost:3000/stock/${id}`);
};

document.getElementById("simpan").addEventListener("click", function (event) {
	event.preventDefault();

	const name = document.getElementById("name").value;
	const quantity = document.getElementById("quantity").value;
	const price = document.getElementById("price").value;
	const data = {
		name: name,
		quantity: quantity,
		price: price,
	};
	axios
		.post("http://localhost:3000/stock", data)
		.then((response) => {
			console.log(response);
			window.alert("Barang berhasil di tambah");
		})
		.catch((err) => {
			console.error(err);
		});
});

// const update = (id) => {
// 	const stock = data.find((item) => {
// 		return item.id === id;
// 	});
	
// 	if (stock) {
// 		const id = window.prompt("Id", stock.id);
// 		const name = window.prompt("Name", stock.name);
// 		const price = window.prompt("Price", stock.price);
// 		const quantity = window.prompt("Quantity", stock.quantity);
// 		axios.put(`http://localhost:3000/stock/${id}`, {
// 			id,
// 			name,
// 			price,
// 			quantity,
// 		});
// 	}
// };