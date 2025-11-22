---
title: "Search"
permalink: /search/
layout: single
author_profile: false
---

<script>
  function searchPosts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const posts = document.querySelectorAll('.search-result');

    posts.forEach(post => {
      const title = post.querySelector('h3').textContent.toLowerCase();
      const excerpt = post.querySelector('p').textContent.toLowerCase();

      if (title.includes(query) || excerpt.includes(query)) {
        post.style.display = 'block';
      } else {
        post.style.display = 'none';
      }
    });
  }
</script>

<div class="search-box">
  <input type="text" id="search-input" placeholder="Search posts..." onkeyup="searchPosts()" style="width: 100%; padding: 10px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px;">
</div>

<div class="search-results" style="margin-top: 30px;">
  {% for post in site.posts %}
    <div class="search-result" style="margin-bottom: 30px;">
      <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
      <p class="post-meta">{{ post.date | date: "%B %d, %Y" }}</p>
      <p>{{ post.excerpt | strip_html | truncatewords: 50 }}</p>
    </div>
  {% endfor %}
</div>
