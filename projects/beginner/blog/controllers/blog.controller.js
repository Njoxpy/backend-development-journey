const db = require("../config/DB");

// get blogs
const getBlogs = async (req, res) => {
    db.query("SELECT * FROM blogs", (errr, results) => {
        if (errr) {
            return res.status(500).json({ message: errr.message });
        }

        if (results.length === 0) {
            return res.status(404).json({message: "No blogs found"});
        }
        res.status(200).json({ blogs: results });
    })
}

// get blog by id
const getBlog = async (req, res) => {
    db.query("SELECT * FROM blogs WHERE id = ?", [req.params.id], (errr, results) => {
        if (errr) {
            return res.status(500).json({ message: errr.message });
        }

        if (results.length === 0) {
            return res.status(404).json({message: "No blog found"});
        }
        res.status(200).json(results);
    })
}

// cREATE blog
const createBlog = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Fill all fields: title, content" });
    }

    db.query(
        "INSERT INTO blogs (title, content) VALUES (?, ?)",
        [title, content],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            res.status(201).json({
                message: "Blog created successfully",
                blogId: results.insertId,
            });
        }
    );
};


module.exports = {
    getBlogs,
    getBlog,
    createBlog
}