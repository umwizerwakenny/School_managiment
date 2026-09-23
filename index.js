const express=require('express');
require('dotenv').config();
const app=express();
const port=3000;
const db=require('./db');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/students',(req,res)=>{
    res.sendFile(__dirname + '/public/students.html');
});
app.post('/students',(req,res)=>{
    const {name,level,trade}=req.body;

    const sql="INSERT INTO students(name,level,trade) VALUES(?,?,?)";
    db.query(sql,[name,level,trade],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).send('failed to insert');
        }
        res.send('new student is successfully added');
    });
});

app.get('/api/students',(req,res)=>{
    const sql='SELECT * FROM students';
    
    db.query(sql,(err,result)=>{
        if(err){
        console.log(err);
        return res.status(400).res('failed to retrieve');
    }
    res.json(result);

    });
    
});

app.put('/api/students/:id',(req,res)=>{
    const{id}=req.params;
    const{name,level,trade}=req.body;

    const sql="UPDATE students SET name=?,level=?,trade=? WHERE id=?";
    db.query(sql,[name,level,trade,id],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(404).send('not found');
        }
        res.json({
message:'updated successfully',
result:result
        });
    });
});
app.delete('/api/students/:id',(req,res)=>{
//check required field
    
    const {id}=req.params;
    const sql="DELETE FROM students WHERE id=?";
    db.query(sql,[id],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).send('deletion failed:');
        }
        res.json({
            message:"student deleted successfully",
            result:result

        });
    });
});
//about page
app.get('/about',(req,res)=>{
    res.sendFile(__dirname + '/public/about.html');
});

//contact page
app.get('/contact',(req,res)=>{
    res.sendFile(__dirname +'/public/contact.html');
});

//teachers pages
app.get('/teachers',(req,res)=>{
    res.sendFile(__dirname + '/public/teachers.html');
})

//perform teachers CRUD OPERATION 
//create
app.post('/api/teachers',(req,res)=>{
    const {name,subject,Qualification}=req.body;
    //check required field
    if(!name||!subject||!Qualification){
        return res.status(500).json({
            message:'all field required'
        });
    };
    const sql="INSERT INTO teachers(name,subject,Qualification) VALUES(?,?,?)";
    db.query(sql,[name,subject,Qualification],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                message:' failed'
            });
        };
        res.send('teacher added successfully');
    });
});

//read
app.get('/api/teachers',(req,res)=>{

    const sql="SELECT * FROM teachers";
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
                message:'failed to fetch data'
            });
        };
        res.json(result);
    });

});

//upddate
app.put('/api/teachers/:id',(req,res)=>{
    const {id}=req.params;
    const{name,subject, Qualification}=req.body;
    const sql="UPDATE teachers SET name=?,subject=?,Qualification=?" ;
    db.query(sql,[name,subject,Qualification],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
                message:'failed to update'
            });
        }
            res.json({
message:'update successfully',
result:result
            })
        
    });
});

//delete teachers
app.delete('/api/teachers/:id',(req,res)=>{
    const {id}=req.params;
    const sql="DELETE  FROM teachers WHERE id=?";
    db.query(sql,[id],(err,result)=>{
if(err){
    console.log(err);
    return res.status(400).json({
        message:'failed to deleted'
    });

};
res.json({
    message:' teacher deleted successfully',
    result:result
});
    });
    
    
});

//perform subjects crud operation
//ceate 

app.get('/subjects',(req,res)=>{

    res.sendFile(__dirname + '/public/subjects.html');
});
app.post('/subjects',(req,res)=>{
    const{SubjectName,SubjectCode}=req.body;
    // //chech required field
    // if(!SubjectName,!SubjectCode){
    //     return res.status(500).json({
    //         message:"all field are required"
    //     });
    // };
    const sql="INSERT INTO subjects(SubjectName,SubjectCode)VALUES(?,?)";
    db.query(sql,[SubjectName,SubjectCode],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).send('failed to insert subject');
        };
        return res.json(result);
    });
    
});



//read
app.get('/subjects',(req,res)=>{

    const sql='SELECT * FROM subjects';
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(404).send('not found');
        };
        return res.send(result);
    });
});

//update
app.put('/api/subjects/:id',(req,res)=>{
    const{id}=res.params;
    const {SubjectName,SubjectCode}=req.body;
    const sql="UPDATE subjects SET subjectName=?,subjectCode=?";
    db.query(sql,[SubjectName,SubjectCode],(err,result)=>{
        if(err){
        console.log(err);
        return res.status(400).send('failed to update');
        }
        res.json({
            message:"subject update successfully",
            result:result
        });
    });
});

//delete
app.delete('/api/subjects/:id',(req,res)=>{
    const{id}=req.params;
    const sql="DELETE FROM subjects WHERE id=?";
    db.query(sql,[id],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).send('subject deletion failed');
        }
        res.json({
            message:"subject deletion successfully",
            result:result
        });
    });
});
// perform CRUD on classes

// GET classes page
app.get('/classes', (req, res) => {
    res.sendFile(__dirname + '/public/classes.html');
});

// CREATE class
app.post('/classes', (req, res) => {

    // First get data from form
    const { className, level, trade } = req.body;

    // Check if any field is empty
    if (!className || !level || !trade) {
        return res.status(400).send({
            message: 'All fields are required'
        });
    }

    //SQL query
    const sql = `
        INSERT INTO classes (className, level, trade)
        VALUES (?, ?, ?)
    `;

    // Execute query
    db.query(sql, [className, level, trade], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send('Failed to add class');
        }

        res.send('Class added successfully');
    });
});

//post
app.get('/classes',(req,res)=>{
    const sql="SELECT * FROM classes";
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).send('failed to retrieve');
        }
        res.send(result);
    });
    
});

//update
app.put('/api/classes/:id',(req,res)=>{
    const {id}=res.params;
    const {className,level,trade}=req.body;
    const sql="UPDATE classes SET className=?,level=?,trade=? WHERE";
    db.query(sql,[className,level,trade],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).send('class update failed');
        }
        res.json({
            message:'class update successfully',
            result:result
        });
    });
});

//delete
app.delete('/api/classes/:id',(req,res)=>{
    const {id}=res.params;
    const sql="DELETE FROM classes WHERE i?";
    db.query(sql,[id],(err,result)=>{
        
    })
})


app.listen(port,()=>{
    console.log(`server is running on port${port}`);
});