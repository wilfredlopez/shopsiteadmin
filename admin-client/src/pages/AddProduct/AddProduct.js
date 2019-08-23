import React, { Component } from "react"
import { Container, Button } from "@material-ui/core"

export default class AddProduct extends Component {
  state = {
    csvFile: undefined,
  }

  //   product = {
  //     productId: "2222-2024",
  //     name: "Apple Laptop",
  //     description: "Apple es Apple",
  //     brand: "Apple",
  //     price: "1020.99",
  //     msrp: "1720.60",
  //     condition: "New",
  //     searchable: "true",
  //     online: "true",
  //     color: "grey",
  //     size: "LG",
  //     gender: "Neutral",
  //     taxClass: "no tax",
  //     imgUrl:
  //       "https://www.techadvisor.co.uk/cmsdata/reviews/3663694/idea-c-10.jpg",
  //     img_thumb:
  //       "https://www.techadvisor.co.uk/cmsdata/reviews/3663694/idea-c-10.jpg",
  //     available: "true",
  //     inventoryOnHand: "4",
  //     ageGroup: "Adult",
  //     mainCategory: { name: "women", link: "/women" },
  //     categories: [{ main: "women", name: "wtech", link: "/women/wtech" }],
  //   }

  handleFileChange = e => {
    this.setState({ csvFile: e.target.files[0] })
    //console.log(e.target.value)
  }

  handleSubmit = async e => {
    e.preventDefault()
    const file = this.state.csvFile
    const table = []
    const reader = await new FileReader()
    const products = []
    reader.onload = async function(e) {
      // Use reader.result
      await table.push(
        reader.result
          .trim()
          .split(/\n/)
          .slice(1),
      )
      const dataColumns = []
      await table[0].forEach(row => {
        dataColumns.push(row.split(","))
      })

      await dataColumns.forEach(columns => {
        products.push({
          productId: columns[0].trim(),
          ageGroup: columns[1].trim(),
          description: columns[8].trim(),
          brand: columns[3].trim(),
          gender: columns[9].trim(),
          price: columns[18].trim(),
          condition: columns[7].trim(),
          msrp: columns[16].trim(),
          searchable:
            columns[19].trim().toLowerCase() === "true" ? true : false,
          available: columns[2].trim().toLowerCase() === "true" ? true : false,
          online: columns[23].trim().toLowerCase() === "true" ? true : false,
          color: columns[22].trim(),
          size: columns[20].trim(),
          imgUrl: columns[11].trim(),
          taxClass: columns[21].trim(),
          mainCategory: {
            name: columns[15].trim(),
            link: columns[14].trim(),
          },
          "mainCategory-main": columns[13].trim(),
          img_thumb: columns[10].trim(),
          inventoryOnHand: columns[12].trim(),
          name: columns[17].trim(),
          categories: [
            {
              main: columns[4].trim(),
              name: columns[5].trim(),
              link: columns[6].trim(),
            },
          ],
        })
      })

      products.forEach(p => {
        console.log(JSON.stringify(p))
        saveToDatabase(p)
      })
    }

    const APIURL = "http://localhost:5000/api/products/bulk"
    async function saveToDatabase(prodArr) {
      const res = await fetch(APIURL, {
        method: "POST",
        body: JSON.stringify(prodArr),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await res.json()
      console.log(data)
    }

    await reader.readAsText(file)
  }
  render() {
    return (
      <React.Fragment>
        <Container>
          <h1>Add Products</h1>
          <p>
            Template for Bulk Upload{" "}
            <a href="/template.csv" target="_blank">
              Download
            </a>
          </p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-control-w">
              <label>
                <strong>Bulk Upload</strong>
              </label>
              <input type="file" name="file" onChange={this.handleFileChange} />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Add Products
            </Button>
          </form>
        </Container>
      </React.Fragment>
    )
  }
}
