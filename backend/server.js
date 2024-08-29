import express from 'express';
const app = express();

import cors from 'cors';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

// Get information in JSON
app.use(express.json())

// ENABLE CORS
app.use(cors('http://localhost:5173/'))

// List all users
app.get('/users', async (req, res) => {
    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })

    } else {
        users = await prisma.user.findMany()
    }

    res.status(200).json(users)
})

// Create user
app.post('/createUser', async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json({ message: 'User created sucessfully' })
})

// Edit User
app.put('/editUser/:id', async (req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(200).json({ message: 'User updated successfully' })
})

// Delete user
app.delete('/deleteUser/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: 'User deleted successfully' })
})


// Port
app.listen(3000)