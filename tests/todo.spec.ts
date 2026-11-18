import { test, expect } from '@playwright/test';

test('S4: 三条混合，其中一条已完成带删除线，计数为 2', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear()
    localStorage.setItem('todos',JSON.stringify([
      {id:1,text:'买牛奶',done:false},
      {id:2,text:'写测试',done:true},
      {id:3,text:'睡觉',done:false},
    ]));
  });
  await page.goto('/');

  const items = page.getByTestId('todo-item');

  
  await expect(items).toHaveCount(3);
  await expect(page.getByTestId('count')).toHaveText('2');
  await expect(page.locator('.done[data-testid="todo-item"]')).toHaveCount(1);
  await expect(
    items.filter({ hasText: '写测试' }).getByTestId('todo-text')
  ).toHaveCSS('text-decoration-line', 'line-through');
});

// test('已有两条待办时，直接显示列表而不是空状态', async({page})=>{
//   await page.addInitScript(()=>{
//     localStorage.setItem('todos',JSON.stringfy([
//       {id:1,text:'买牛奶',done:false},
//       {id:2,text:'写测试',done:true},
//     ]));
//   });

//   await page.goto('/');

//   await expect(page.getByTestId('todo-item')).toHaveCount(2);
//   await expect(page.getByTestId('count')).toHaveCount('1');
//   await expect(page.getByTestId('empty-state')).toBeHidden();
  
// });

// const addCases = [
//   { label: '普通文本',   text: '买牛奶' },
//   { label: '带前后空格', text: '  写测试  ' },
//   { label: '很长的一段', text: '这是一条特别特别长的待办事项用来看看会不会把布局撑坏' },
//   { label: 'emoji',      text: '🏃 跑步 5 公里' },
// ];

// for (const c of addCases) {
//   test(`添加待办：${c.label}`, async ({ page }) => {
//     await page.goto('/');
//     await page.getByTestId('new-todo').fill(c.text);
//     await page.getByTestId('add-btn').click();

//     await expect(page.getByTestId('todo-item')).toHaveCount(1);
//     // trim() 之后比较，因为应用会去掉前后空格
//     await expect(page.getByTestId('todo-text')).toHaveText(c.text.trim());
//   });
// }