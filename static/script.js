document.getElementById('event-form').onsubmit = async (e) => {
  e.preventDefault();
  const data = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    start_time: document.getElementById('start_time').value,
    end_time: document.getElementById('end_time').value,
  };
  await fetch('/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  location.reload();
};

document.querySelectorAll('.delete-btn').forEach(btn => {
  btn.onclick = async () => {
    const id = btn.parentElement.dataset.id;
    await fetch(`/events/${id}`, { method: 'DELETE' });
    location.reload();
  };
});

let editingId = null;
document.querySelectorAll('.edit-btn').forEach(btn => {
  btn.onclick = () => {
    const card = btn.parentElement;
    editingId = card.dataset.id;
    document.getElementById('edit-title').value = card.querySelector('h3').innerText;
    document.getElementById('edit-description').value = card.querySelectorAll('p')[0].innerText;

    const times = card.querySelectorAll('p')[1].innerText.replace("🕒 ", "").split(" - ");
    const parseToInputFormat = (timeStr) => {
      const date = new Date(timeStr);
      const pad = n => n.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    document.getElementById('edit-start').value = parseToInputFormat(times[0]);
    document.getElementById('edit-end').value = parseToInputFormat(times[1]);
    document.getElementById('modal').style.display = 'flex';
  };
});

document.getElementById('save-edit').onclick = async () => {
  const data = {
    title: document.getElementById('edit-title').value,
    description: document.getElementById('edit-description').value,
    start_time: document.getElementById('edit-start').value,
    end_time: document.getElementById('edit-end').value,
  };
  await fetch(`/events/${editingId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  location.reload();
};

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

window.onclick = (event) => {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    closeModal();
  }
};

document.getElementById('clear-search').onclick = () => {
  window.location.href = '/';
};

document.getElementById('search-btn').onclick = () => {
  const query = document.getElementById('search').value.trim();
  if (query.length > 0) {
    window.location.href = `/?search=${encodeURIComponent(query)}`;
  }
};

window.onload = () => {
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');

  const toDatetimeLocal = dt => {
    return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes() + 1)}`;
  };

  document.getElementById('start_time').value = toDatetimeLocal(now);

  now.setHours(now.getHours() + 4);
  document.getElementById('end_time').value = toDatetimeLocal(now);

  // Convert event display times to 12-hour format
  document.querySelectorAll(".event-card").forEach(card => {
    const timePara = card.querySelectorAll("p")[1];
    if (timePara) {
      const [startRaw, endRaw] = timePara.innerText.replace("🕒 ", "").split(" - ");
      const start = new Date(startRaw);
      const end = new Date(endRaw);

      const format12 = dt => dt.toLocaleString(undefined, {
        year: "numeric", month: "short", day: "numeric",
        hour: "numeric", minute: "2-digit", hour12: true
      });

      timePara.innerText = `🕒 ${format12(start)} - ${format12(end)}`;
    }
  });
};
