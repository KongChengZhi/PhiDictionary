document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const resultDiv = document.getElementById('result');

  // 处理搜索按钮点击事件
  searchButton.addEventListener('click', performSearch);
  
  // 处理回车键搜索
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

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
});
