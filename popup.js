document.addEventListener('DOMContentLoaded', function() {
  // 获取DOM元素
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const resultDiv = document.getElementById('result');
  const translateInput = document.getElementById('translateInput');
  const translateButton = document.getElementById('translateButton');
  const translateResult = document.getElementById('translateResult');

  // 导航相关元素
  const navItems = document.querySelectorAll('.nav-item');
  const panels = document.querySelectorAll('.panel');

  // 导航切换功能
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      // 移除所有active类
      navItems.forEach(nav => nav.classList.remove('active'));
      panels.forEach(panel => panel.classList.remove('active'));
      
      // 添加active类到当前项
      this.classList.add('active');
      const targetPanel = this.getAttribute('data-panel');
      document.getElementById(`${targetPanel}Panel`).classList.add('active');
    });
  });

  // 处理搜索按钮点击事件
  searchButton.addEventListener('click', performSearch);
  
  // 处理回车键搜索
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  // 处理翻译按钮点击事件
  translateButton.addEventListener('click', performTranslate);

  function performSearch() {
    const word = searchInput.value.trim();
    if (!word) {
      resultDiv.innerHTML = '请输入要查询的单词';
      return;
    }

    // 这里我们使用免费的Dictionary API进行演示
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          const meanings = data[0].meanings;
          let html = `<h3>${word}</h3>`;
          
          meanings.forEach(meaning => {
            html += `<p><strong>${meaning.partOfSpeech}</strong></p>`;
            meaning.definitions.forEach(def => {
              html += `<p>• ${def.definition}</p>`;
              if (def.example) {
                html += `<p><em>例句：${def.example}</em></p>`;
              }
            });
          });
          
          resultDiv.innerHTML = html;
        } else {
          resultDiv.innerHTML = '未找到该单词的释义';
        }
      })
      .catch(error => {
        resultDiv.innerHTML = '查询出错，请稍后重试';
        console.error('Error:', error);
      });
  }

  function performTranslate() {
    const text = translateInput.value.trim();
    if (!text) {
      translateResult.innerHTML = '请输入要翻译的文本';
      return;
    }

    // 翻译功能的具体实现将在后续添加
    translateResult.innerHTML = '翻译功能即将上线...';
  }
});
