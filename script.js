		document.addEventListener('DOMContentLoaded', () => {


			const mobileToggle = document.getElementById('mobile-toggle');
			const mobileMenu = document.getElementById('mobile-menu');
			mobileToggle.addEventListener('click', () => {
				mobileMenu.classList.toggle('open');
			});
			document.querySelectorAll('.mobile-link').forEach(link => {
				link.addEventListener('click', () => mobileMenu.classList.remove('open'));
			});


			const tabBtns = document.querySelectorAll('.tab-btn');
			const tabPanels = document.querySelectorAll('.tab-panel');

			tabBtns.forEach(btn => {
				btn.addEventListener('click', () => {
					const targetTab = btn.dataset.tab;
					tabBtns.forEach(b => b.classList.remove('active'));
					tabPanels.forEach(p => p.classList.remove('active'));

					btn.classList.add('active');
					document.getElementById(targetTab).classList.add('active');
				});
			});


			const starBtns = document.querySelectorAll('.star-btn-input:not(.modal-star-edit)');
			const ratingHint = document.getElementById('rating-hint');
			let selectedRating = 0;

			const ratingLabels = {
				1: "1 Star - Tough day",
				2: "2 Stars - Uneasy day",
				3: "3 Stars - Average day",
				4: "4 Stars - Good day",
				5: "5 Stars - Peaceful day"
			};

			starBtns.forEach(btn => {
				btn.addEventListener('click', () => {
					selectedRating = parseInt(btn.dataset.rating, 10);
					starBtns.forEach((s, idx) => {
						s.classList.toggle('active', idx < selectedRating);
					});
					ratingHint.textContent = ratingLabels[selectedRating];
				});
			});

			const entryTextarea = document.getElementById('entry-text');
			const wordCountDisplay = document.getElementById('word-count-display');

			entryTextarea.addEventListener('input', () => {
				const words = entryTextarea.value.trim().split(/\s+/).filter(w => w.length > 0);
				wordCountDisplay.textContent = `${words.length} words`;
			});
			const entriesDatabase = [
				{
					date: "August 18, 2026",
					stars: 4,
					ratingText: "Good Day",
					text: "Finally made headway on the project design. Took a late afternoon walk around the block as the sunset turned the sky soft orange."
				},
				{
					date: "August 17, 2026",
					stars: 5,
					ratingText: "Peaceful Day",
					text: "Had a wonderfully unhurried Sunday. Long dinner with family, fresh fruit, and zero screens after 9 PM."
				},
				{
					date: "August 16, 2026",
					stars: 3,
					ratingText: "Average Day",
					text: "Felt sluggish and unproductive during the afternoon. Reminded myself that not every day has to be a peak performance."
				}
			];

			const journalForm = document.getElementById('journal-form');
			const vaultGridList = document.getElementById('vault-grid-list');

			journalForm.addEventListener('submit', (e) => {
				e.preventDefault();
				const text = entryTextarea.value.trim();

				if (!selectedRating) {
					showToast('Please select how today felt first.');
					return;
				}
				if (!text) {
					showToast('Please write a few words to unburden your mind.');
					return;
				}

				const words = text.split(/\s+/).filter(w => w.length > 0).length;

				const newEntryObj = {
					date: "Today, Aug 19, 2026",
					stars: selectedRating,
					ratingText: ratingLabels[selectedRating].split(/[-—]/)[1].trim(),
					text: text
				};
				entriesDatabase.unshift(newEntryObj);

				const card = document.createElement('article');
				card.className = 'vault-card-box';
				card.dataset.rating = selectedRating;
				card.dataset.index = 0;

				document.querySelectorAll('.vault-card-box').forEach(c => {
					c.dataset.index = parseInt(c.dataset.index, 10) + 1;
				});

				const starsStr = '★'.repeat(selectedRating) + '☆'.repeat(5 - selectedRating);

				card.innerHTML = `
					<div>
						<div class="vault-box-date">Today, Aug 19, 2026</div>
						<div class="vault-box-stars">${starsStr}</div>
					</div>
					<div class="vault-box-footer">
						<span class="box-word-count">${words} words</span>
						<span class="read-trigger-link">Open entry 📖</span>
					</div>
				`;

				vaultGridList.prepend(card);
				attachCardClick(card);

				showToast('Saved to your Memory Sanctuary.');

				entryTextarea.value = '';
				wordCountDisplay.textContent = '0 words';
				selectedRating = 0;
				starBtns.forEach(s => s.classList.remove('active'));
				ratingHint.textContent = 'Select a rating';
			});


			const readerModal = document.getElementById('reader-modal');
			const closeModalBtn = document.getElementById('close-modal-btn');
			const modalDate = document.getElementById('modal-date');
			const modalStars = document.getElementById('modal-stars');
			const modalRatingText = document.getElementById('modal-rating-text');
			const modalWordCount = document.getElementById('modal-word-count');
			const modalBody = document.getElementById('modal-body');
			const prevBtn = document.getElementById('prev-entry-btn');
			const nextBtn = document.getElementById('next-entry-btn');
			const editBtn = document.getElementById('edit-entry-btn');
			const modalEditBox = document.getElementById('modal-edit-box');
			const modalEditTextarea = document.getElementById('modal-edit-textarea');
			const saveEditBtn = document.getElementById('save-edit-btn');
			const cancelEditBtn = document.getElementById('cancel-edit-btn');
			const modalStarEdits = document.querySelectorAll('.modal-star-edit');

			let activeIndex = 0;
			let editRating = 0;

			function openReader(index) {
				if (index < 0 || index >= entriesDatabase.length) return;
				activeIndex = index;
				const entry = entriesDatabase[activeIndex];

				modalDate.textContent = entry.date;
				modalStars.textContent = '★'.repeat(entry.stars) + '☆'.repeat(5 - entry.stars);
				modalRatingText.textContent = entry.ratingText;

				const words = entry.text.trim().split(/\s+/).filter(w => w).length;
				modalWordCount.textContent = `${words} words`;
				modalBody.textContent = entry.text;
				closeEditMode();

				readerModal.classList.add('open');
			}

			function closeReader() {
				readerModal.classList.remove('open');
				closeEditMode();
			}

			function openEditMode() {
				const entry = entriesDatabase[activeIndex];
				editRating = entry.stars;
				modalEditTextarea.value = entry.text;

				modalStarEdits.forEach((s, idx) => {
					s.classList.toggle('active', idx < editRating);
				});

				modalBody.style.display = 'none';
				modalEditBox.style.display = 'block';
			}

			function closeEditMode() {
				modalBody.style.display = 'block';
				modalEditBox.style.display = 'none';
			}

			modalStarEdits.forEach(btn => {
				btn.addEventListener('click', () => {
					editRating = parseInt(btn.dataset.rating, 10);
					modalStarEdits.forEach((s, idx) => {
						s.classList.toggle('active', idx < editRating);
					});
				});
			});

			editBtn.addEventListener('click', openEditMode);
			cancelEditBtn.addEventListener('click', closeEditMode);
			saveEditBtn.addEventListener('click', () => {
				const newText = modalEditTextarea.value.trim();
				if (!newText) {
					showToast('Text cannot be empty.');
					return;
				}
				if (!editRating) editRating = 4;
				const entry = entriesDatabase[activeIndex];
				entry.text = newText;
				entry.stars = editRating;
				entry.ratingText = ratingLabels[editRating].split(/[-—]/)[1].trim();
				modalStars.textContent = '★'.repeat(entry.stars) + '☆'.repeat(5 - entry.stars);
				modalRatingText.textContent = entry.ratingText;
				const words = newText.split(/\s+/).filter(w => w).length;
				modalWordCount.textContent = `${words} words`;
				modalBody.textContent = newText;
				const cards = document.querySelectorAll('.vault-card-box');
				cards.forEach(card => {
					if (parseInt(card.dataset.index, 10) === activeIndex) {
						card.dataset.rating = editRating;
						card.querySelector('.vault-box-stars').textContent = '★'.repeat(editRating) + '☆'.repeat(5 - editRating);
						card.querySelector('.box-word-count').textContent = `${words} words`;
					}
				});

				closeEditMode();
				showToast('Journal page updated successfully.');
			});

			function attachCardClick(card) {
				card.addEventListener('click', () => {
					const idx = parseInt(card.dataset.index, 10);
					openReader(idx);
				});
			}

			document.querySelectorAll('.vault-card-box').forEach(attachCardClick);

			closeModalBtn.addEventListener('click', closeReader);

			readerModal.addEventListener('click', (e) => {
				if (e.target === readerModal) closeReader();
			});

			document.addEventListener('keydown', (e) => {
				if (e.key === 'Escape') closeReader();
				if (readerModal.classList.contains('open') && modalEditBox.style.display !== 'block') {
					if (e.key === 'ArrowRight' && activeIndex > 0) openReader(activeIndex - 1);
					if (e.key === 'ArrowLeft' && activeIndex < entriesDatabase.length - 1) openReader(activeIndex + 1);
				}
			});

			prevBtn.addEventListener('click', () => {
				if (activeIndex < entriesDatabase.length - 1) openReader(activeIndex + 1);
			});

			nextBtn.addEventListener('click', () => {
				if (activeIndex > 0) openReader(activeIndex - 1);
			});


			const filterDropdownBtn = document.getElementById('filter-dropdown-btn');
			const filterDropdownMenu = document.getElementById('filter-dropdown-menu');
			const filterBtnLabel = document.getElementById('filter-btn-label');
			const dropdownItems = document.querySelectorAll('.dropdown-item');
			const searchInput = document.getElementById('vault-search');

			filterDropdownBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				filterDropdownMenu.classList.toggle('show');
				filterDropdownBtn.classList.toggle('active');
			});

			document.addEventListener('click', () => {
				filterDropdownMenu.classList.remove('show');
				filterDropdownBtn.classList.remove('active');
			});

			dropdownItems.forEach(item => {
				item.addEventListener('click', (e) => {
					e.stopPropagation();
					dropdownItems.forEach(i => i.classList.remove('selected'));
					item.classList.add('selected');

					const filter = item.dataset.filter;
					filterBtnLabel.textContent = filter === 'all' ? 'Filter' : `${filter} ★ Only`;
					filterDropdownMenu.classList.remove('show');
					filterDropdownBtn.classList.remove('active');

					applyFilters();
				});
			});

			searchInput.addEventListener('input', applyFilters);

			function applyFilters() {
				const query = searchInput.value.toLowerCase();
				const selectedItem = document.querySelector('.dropdown-item.selected');
				const filter = selectedItem ? selectedItem.dataset.filter : 'all';

				document.querySelectorAll('.vault-card-box').forEach(card => {
					const idx = parseInt(card.dataset.index, 10);
					const entry = entriesDatabase[idx];
					const textMatch = !entry || entry.text.toLowerCase().includes(query) || entry.date.toLowerCase().includes(query);
					const ratingMatch = filter === 'all' || card.dataset.rating === filter;

					if (textMatch && ratingMatch) {
						card.style.display = 'flex';
					} else {
						card.style.display = 'none';
					}
				});
			}


			const toast = document.getElementById('toast');
			const toastMsg = document.getElementById('toast-message');
			let toastTimer;

			function showToast(message) {
				toastMsg.textContent = message;
				toast.classList.add('show');
				clearTimeout(toastTimer);
				toastTimer = setTimeout(() => {
					toast.classList.remove('show');
				}, 3200);
			}


			const logoBtn = document.getElementById('logo-btn');
			let logoClicks = 0;
			logoBtn.addEventListener('click', (e) => {
				logoClicks++;
				if (logoClicks === 5) {
					showToast('✨ Secret Found: Pause was built with care for thoughtful minds.');
					logoClicks = 0;
				}
			});

			const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
			let konamiIndex = 0;

			document.addEventListener('keydown', (e) => {
				if (e.key === konamiCode[konamiIndex] || e.key.toLowerCase() === konamiCode[konamiIndex]) {
					konamiIndex++;
					if (konamiIndex === konamiCode.length) {
						document.documentElement.setAttribute('data-theme', 'candlelight');
						document.getElementById('easter-banner').style.display = 'block';
						showToast('🕯️ Secret Candlelight Mode Unlocked!');
						konamiIndex = 0;
					}
				} else {
					konamiIndex = 0;
				}
			});

		});
