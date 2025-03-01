const cors = require('cors');
const express = require('express');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const discussionRoutes = require('./routes/discussion.routes');

const app = express();
app.use(express.json());
app.use(cors({ path: process.env.ALLOWED_ORIGINS }));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/discussions', discussionRoutes);
app.get('/', (req, res) => {
    res.send('Gateway service is up and running')
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Gateway service running on port ${PORT}`);
});
