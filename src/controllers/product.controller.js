import Product from "../models/product.model.js"
export const productCreateController = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;


        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const existingProduct = await Product.findOne({ name: name.trim() });

        if (existingProduct) {
            return res.status(400).json({ message: "Product with this name already exists" });
        }


        const product = await Product.create({ name, description, price, category });

        return res.status(201).json({ message: "Product created successfully", product });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}