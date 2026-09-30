export const userController = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const userloginController = async (req, res) => {
    try {
        res.status(200).send("login page")
    } catch (error) {

    }
}


