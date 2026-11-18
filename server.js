const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const DB = path.join(__dirname, 'data', 'db.json');

// 第一次运行自动建数据文件，省掉"手动建目录"这一步
fs.mkdirSync(path.dirname(DB), { recursive: true });
if (!fs.existsSync(DB)) fs.writeFileSync(DB, '[]');

const read  = () => JSON.parse(fs.readFileSync(DB, 'utf8'));
const write = (list) => fs.writeFileSync(DB, JSON.stringify(list, null, 2));

app.use(express.json());                                // 让 req.body 能拿到 JSON
app.use(express.static(path.join(__dirname, 'app')));    // 把 app/ 当网站根目录

// 查
app.get('/api/todos', (req, res) => res.json(read()));

// 增
app.post('/api/todos', (req, res) => {
  const title = String(req.body.title || '').trim();
  if (!title) return res.status(400).json({ error: 'title is required' });
  const list = read();
  const todo = { id: Date.now().toString(), title, done: false };
  list.push(todo);
  write(list);
  res.status(201).json(todo);
});

// 改
app.patch('/api/todos/:id', (req, res) => {
  const list = read();
  const todo = list.find((t) => t.id === req.params.id);
  if (!todo) return res.status(404).json({ error: 'not found' });
  if (req.body.done !== undefined) todo.done = !!req.body.done;
  if (req.body.title !== undefined) todo.title = String(req.body.title).trim();
  write(list);
  res.json(todo);
});

// 删
app.delete('/api/todos/:id', (req, res) => {
  const list = read();
  const next = list.filter((t) => t.id !== req.params.id);
  if (next.length === list.length) return res.status(404).json({ error: 'not found' });
  write(next);
  res.status(204).end();
});

app.listen(3000, () => console.log('http://localhost:3000'));