// 创建浮动提示框
const tooltip = document.createElement('div');
tooltip.style.cssText = `
  position: fixed;
  padding: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
  z-index: 10000;
  display: none;
  max-width: 300px;
`;
document.body.appendChild(tooltip);

// 监听双击事件
document.addEventListener('dblclick', async function(e) {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();
  
  if (selectedText) {
    // 获取选中文本的位置
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    // 显示加载中
    tooltip.style.display = 'block';
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
    tooltip.textContent = '查询中...';
    
    try {
      // 调用词典API
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(selectedText)}`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const meaning = data[0].meanings[0];
        tooltip.innerHTML = `
          <strong>${selectedText}</strong><br>
          ${meaning.partOfSpeech}: ${meaning.definitions[0].definition}
        `;
      } else {
        tooltip.textContent = '未找到释义';
      }
    } catch (error) {
      tooltip.textContent = '查询失败';
      console.error('Error:', error);
    }
  }
});

// 点击其他地方时隐藏提示框
document.addEventListener('click', function(e) {
  if (!tooltip.contains(e.target)) {
    tooltip.style.display = 'none';
  }
});
