/* ============================================================
   RAFALSKY DICTIONARY — APP LOGIC
   ============================================================ */

'use strict';

// ─── Calligraphic Fonts Pool ──────────────────────────────────
const CALLIGRAPHIC_FONTS = [
  { name: 'Playfair Display',   style: "'Playfair Display', serif",          italic: true  },
  { name: 'IM Fell English',    style: "'IM Fell English', serif",            italic: true  },
  { name: 'Cormorant Garamond', style: "'Cormorant Garamond', serif",         italic: true  },
  { name: 'Cinzel Decorative',  style: "'Cinzel Decorative', serif",          italic: false },
  { name: 'UnifrakturMaguntia', style: "'UnifrakturMaguntia', cursive",       italic: false },
  { name: 'Marck Script',       style: "'Marck Script', cursive",             italic: false },
  { name: 'Alex Brush',         style: "'Alex Brush', cursive",               italic: false },
  { name: 'Dancing Script',     style: "'Dancing Script', cursive",           italic: false },
  { name: 'Almendra',           style: "'Almendra', serif",                   italic: true  },
  { name: 'Sorts Mill Goudy',   style: "'Sorts Mill Goudy', serif",           italic: true  },
  { name: 'Libre Baskerville',  style: "'Libre Baskerville', serif",          italic: true  },
  { name: 'Spectral',           style: "'Spectral', serif",                   italic: true  },
  { name: 'EB Garamond',        style: "'EB Garamond', serif",                italic: true  },
];

// ─── Curated Dictionary: Іншомовні слова Рафальського ─────────
const CURATED_WORDS = [
  { word: 'Абракадабра',    origin: 'грецьк. ἀβρακαδάβρα', def: 'Безглузді, незрозумілі слова або написи; нісенітниця, нерозбериха.', cat: 'greek' },
  { word: 'Абсурд',         origin: 'латин. absurdus',      def: 'Безглуздість, нісенітниця; те, що суперечить здоровому глузду та логіці.', cat: 'latin' },
  { word: 'Аванс',          origin: 'франц. avance',        def: 'Виплата частини грошей наперед; попередня плата до виконання зобов\'язань.', cat: 'french' },
  { word: 'Авантюра',       origin: 'франц. aventure',      def: 'Сміливе, ризиковане підприємство; пустотлива пригода з невизначеним кінцем.', cat: 'french' },
  { word: 'Авторитет',      origin: 'латин. auctoritas',    def: 'Загальне визнання, вплив, заснований на знаннях, досвіді та повазі оточення.', cat: 'latin' },
  { word: 'Агонія',         origin: 'грецьк. ἀγωνία',       def: 'Останній стан перед смертю; муки, страждання в кризовий момент існування.', cat: 'greek' },
  { word: 'Акцент',         origin: 'латин. accentus',      def: 'Наголос у слові; особливість вимови, властива носіям іншої мови.', cat: 'latin' },
  { word: 'Алегорія',       origin: 'грецьк. ἀλληγορία',    def: 'Зображення абстрактного поняття через конкретний образ; інакомовлення.', cat: 'greek' },
  { word: 'Алхімія',        origin: 'арабськ. al-kīmiyā',   def: 'Середньовічне мистецтво перетворення металів та пошук філософського каменя.', cat: 'latin' },
  { word: 'Амбіція',        origin: 'латин. ambitio',       def: 'Прагнення до слави, успіху або переваги; честолюбність.', cat: 'latin' },
  { word: 'Аномалія',       origin: 'грецьк. ἀνωμαλία',     def: 'Відхилення від норми, закономірності, загального правила.', cat: 'greek' },
  { word: 'Антиквар',       origin: 'латин. antiquarius',   def: 'Знавець і торговець старовинними речами, пам\'ятками мистецтва та рідкісними книгами.', cat: 'latin' },
  { word: 'Апатія',         origin: 'грецьк. ἀπάθεια',      def: 'Байдужість, нерозмовливість, відсутність інтересу та емоцій щодо довкілля.', cat: 'greek' },
  { word: 'Апогей',         origin: 'грецьк. ἀπόγειον',     def: 'Найвища точка, вершина; перен. — найвищий ступінь розвитку чи успіху.', cat: 'greek' },
  { word: 'Аристократ',     origin: 'грецьк. ἀριστοκράτης', def: 'Представник привілейованого стану; людина витонченої вдачі та бездоганних манер.', cat: 'greek' },
  { word: 'Архів',          origin: 'грецьк. ἀρχεῖον',      def: 'Зібрання давніх документів; установа для зберігання та систематизації документів.', cat: 'greek' },
  { word: 'Афоризм',        origin: 'грецьк. ἀφορισμός',    def: 'Коротке влучне висловлювання, що в лаконічній формі виражає глибоку думку.', cat: 'greek' },
  { word: 'Балада',         origin: 'провансальськ. balada', def: 'Ліро-епічний вірш з напруженим сюжетом, що нерідко ʼмістить фантастичні елементи.', cat: 'french' },
  { word: 'Бастіон',        origin: 'франц. bastion',        def: 'Виступаюча частина фортифікаційного укріплення; перен. — оплот, захист.', cat: 'french' },
  { word: 'Бонус',          origin: 'латин. bonus',           def: 'Додаткова винагорода, надбавка; щось понад звичну міру.', cat: 'latin' },
  { word: 'Вакансія',       origin: 'латин. vacantia',       def: 'Вільна посада, незайнята службова посада, що підлягає заміщенню.', cat: 'latin' },
  { word: 'Варвар',         origin: 'грецьк. βάρβαρος',       def: 'Іноземець, чужинець; перен. — жорсток а, груба, некультурна людина.', cat: 'greek' },
  { word: 'Вердикт',        origin: 'латин. vere dictum',    def: 'Рішення суду присяжних; перен. — остаточний висновок, вирок.', cat: 'latin' },
  { word: 'Візія',          origin: 'латин. visio',           def: 'Бачення, видиво; образ майбутнього, що проясняє стратегічний напрямок.', cat: 'latin' },
  { word: 'Галюцинація',    origin: 'латин. hallucinatio',   def: 'Примарне сприйняття неіснуючих предметів або явищ; марення.', cat: 'latin' },
  { word: 'Геній',          origin: 'латин. genius',          def: 'Людина з виключними розумовими здібностями; дух-охоронець у давніх римлян.', cat: 'latin' },
  { word: 'Гіпноз',         origin: 'грецьк. ὕπνος',          def: 'Штучний сон, викликаний навіюванням; стан зниженої свідомості та підвищеної навіюваності.', cat: 'greek' },
  { word: 'Гравітація',     origin: 'латин. gravitas',        def: 'Сила взаємного притягання тіл; земне тяжіння; перен. — незаперечна вага.', cat: 'latin' },
  { word: 'Деградація',     origin: 'латин. degradatio',      def: 'Поступове погіршення, занепад якостей; зниження рівня розвитку.', cat: 'latin' },
  { word: 'Деліkatес',      origin: 'нім. Delikatesse',        def: 'Вишукана страва, рідкісний харчовий продукт; те, що є особливим смаковим задоволенням.', cat: 'german' },
  { word: 'Демагогія',      origin: 'грецьк. δημαγωγία',      def: 'Лицемірні обіцянки та гасла для обману мас; порожня балаканина заради популярності.', cat: 'greek' },
  { word: 'Деспот',         origin: 'грецьк. δεσπότης',       def: 'Необмежений владика; тиран, що діє виключно за власною сваволею.', cat: 'greek' },
  { word: 'Дилема',         origin: 'грецьк. δίλημμα',        def: 'Становище, що вимагає вибору між двома рівнозначними можливостями.', cat: 'greek' },
  { word: 'Дискурс',        origin: 'латин. discursus',       def: 'Мовна діяльність у широкому контексті; зв\'язна послідовність суджень та висловлювань.', cat: 'latin' },
  { word: 'Доктрина',       origin: 'латин. doctrina',        def: 'Вчення, сукупність принципів певного напряму; усталена теоретична система.', cat: 'latin' },
  { word: 'Домінанта',      origin: 'латин. dominans',        def: 'Те, що домінує, переважає; головний елемент, що визначає характер цілого.', cat: 'latin' },
  { word: 'Екзотика',       origin: 'грецьк. ἐξωτικός',       def: 'Незвичайність, дивовижність; те, що притаманне далеким країнам і чуже звичному.', cat: 'greek' },
  { word: 'Еклектика',      origin: 'грецьк. ἐκλεκτικός',     def: 'Поєднання різнорідних елементів, стилів, поглядів без їх органічного синтезу.', cat: 'greek' },
  { word: 'Елегія',         origin: 'грецьк. ἐλεγεία',        def: 'Ліричний твір сумного, задумливого характеру; журба за чимось втраченим.', cat: 'greek' },
  { word: 'Елексир',        origin: 'арабськ. al-iksīr',      def: 'Чудодійний напій, що нібито дає безсмертя; перен. — засіб, що відновлює сили.', cat: 'latin' },
  { word: 'Емпатія',        origin: 'грецьк. ἐμπάθεια',       def: 'Здатність відчувати стан іншої людини, вникати в її переживання; співчуття.', cat: 'greek' },
  { word: 'Епоха',          origin: 'грецьк. ἐποχή',          def: 'Значний відрізок часу в розвитку природи або суспільства; ера.', cat: 'greek' },
  { word: 'Етика',          origin: 'грецьк. ἠθικός',         def: 'Наука про мораль; сукупність норм і правил поведінки людини в суспільстві.', cat: 'greek' },
  { word: 'Ефемерний',      origin: 'грецьк. ἐφήμερος',       def: 'Короткочасний, швидкоплинний, позбавлений тривалості; неміцний.', cat: 'greek' },
  { word: 'Єресь',          origin: 'грецьк. αἵρεσις',        def: 'Відступ від панівного вчення; думка, що суперечить загальноприйнятому.', cat: 'greek' },
  { word: 'Зеніт',          origin: 'арабськ. samt ar-raʼs',  def: 'Вищa точка небосхилу над спостерігачем; перен. — вершина слави, розквіту.', cat: 'latin' },
  { word: 'Ідіосинкразія',  origin: 'грецьк. ἰδιοσυγκρασία', def: 'Хворобливо загострена чутливість до певних подразників; нетерпимість.', cat: 'greek' },
  { word: 'Ілюзія',         origin: 'латин. illusio',         def: 'Помилкове сприйняття дійсності; хибне уявлення про щось; марна надія.', cat: 'latin' },
  { word: 'Імідж',          origin: 'англ. image',            def: 'Штучно створений образ особи або організації в уяві суспільства.', cat: 'english' },
  { word: 'Імпровізація',   origin: 'латин. improvisus',      def: 'Творчість без попередньої підготовки, безпосередньо в момент виконання.', cat: 'latin' },
  { word: 'Інтриґа',        origin: 'франц. intrigue',         def: 'Таємна змова; сукупність прихованих дій задля досягнення особистої vantажу.', cat: 'french' },
  { word: 'Іронія',         origin: 'грецьк. εἰρωνεία',       def: 'Тонке глузування, прихований насміх під маскою серйозності та похвали.', cat: 'greek' },
  { word: 'Каламбур',       origin: 'франц. calembour',        def: 'Дотепна гра слів, заснована на схожості їх звучання за різного значення.', cat: 'french' },
  { word: 'Катастрофа',     origin: 'грецьк. καταστροφή',     def: 'Раптова велика лиха подія; перен. — повний провал, крах справи.', cat: 'greek' },
  { word: 'Кодекс',         origin: 'латин. codex',            def: 'Звід законів, правил; у давнину — рукописна книга.', cat: 'latin' },
  { word: 'Колізія',        origin: 'латин. collisio',         def: 'Зіткнення протилежних сил, інтересів, думок; гострий конфлікт.', cat: 'latin' },
  { word: 'Компроміс',      origin: 'латин. compromissum',     def: 'Угода на основі взаємних поступок; врегулювання суперечки шляхом змін вимог.', cat: 'latin' },
  { word: 'Космополіт',     origin: 'грецьк. κοσμοπολίτης',   def: 'Людина, що вважає себе громадянином усього світу без прив\'язаності до вітчизни.', cat: 'greek' },
  { word: 'Лабіринт',       origin: 'грецьк. λαβύρινθος',     def: 'Заплутана система ходів та приміщень; перен. — щось складне й заплутане.', cat: 'greek' },
  { word: 'Легенда',        origin: 'латин. legenda',          def: 'Переказ напівзабутних подій, оповитих серпанком дивовижного та героїчного.', cat: 'latin' },
  { word: 'Лексикон',       origin: 'грецьк. λεξικόν',        def: 'Словник; сукупність слів, вживаних певною людиною або в певній галузі.', cat: 'greek' },
  { word: 'Лояльність',     origin: 'франц. loyauté',          def: 'Вірність, прихильність; коректне ставлення до чого-небудь без активної протидії.', cat: 'french' },
  { word: 'Манускрипт',     origin: 'латин. manuscriptum',    def: 'Рукописна книга або документ; старовинний рукопис.', cat: 'latin' },
  { word: 'Меланхолія',     origin: 'грецьк. μελαγχολία',     def: 'Похмурий душевний стан, схильність до смутку; один із давніх темпераментів.', cat: 'greek' },
  { word: 'Менталітет',     origin: 'латин. mens, mentis',    def: 'Спосіб мислення, сукупність поглядів, уявлень, властивих народу або групі.', cat: 'latin' },
  { word: 'Містика',        origin: 'грецьк. μυστικός',       def: 'Таємниче, надприродне; вчення про злиття душі з вищим.', cat: 'greek' },
  { word: 'Міф',            origin: 'грецьк. μῦθος',           def: 'Оповідь про богів та героїв; перен. — хибне уявлення, вигадка.', cat: 'greek' },
  { word: 'Монарх',         origin: 'грецьк. μονάρχης',       def: 'Одноособовий правитель держави; цар, король, імператор.', cat: 'greek' },
  { word: 'Монолог',        origin: 'грецьк. μονόλογος',      def: 'Тривале мовлення однієї особи; роздум вголос без відповіді.', cat: 'greek' },
  { word: 'Містеріум',      origin: 'латин. mysterium',       def: 'Таємниця, загадка; релігійна обрядова дія, прихована від непосвячених.', cat: 'latin' },
  { word: 'Негація',        origin: 'латин. negatio',          def: 'Заперечення, відмова; у філос. — знищення чого-небудь як відправна точка розвитку.', cat: 'latin' },
  { word: 'Ностальгія',     origin: 'грецьк. νόστος + ἄλγος', def: 'Туга за батьківщиною; щемне, солодке бажання повернутися до минулого.', cat: 'greek' },
  { word: 'Нюанс',          origin: 'франц. nuance',           def: 'Ледь помітна відмінність у відтінку, значенні; тонкощі вираження.', cat: 'french' },
  { word: 'Обеліск',        origin: 'грецьк. ὀβελίσκος',      def: 'Чотиригранний звужуючий догори кам\'яний стовп зі зрізаною верхівкою.', cat: 'greek' },
  { word: 'Одіссея',        origin: 'грецьк. Ὀδύσσεια',       def: 'Тривала блуканина, сповнена пригод; перен. — тернистий шлях великого задуму.', cat: 'greek' },
  { word: 'Оракул',         origin: 'латин. oraculum',         def: 'Жрець або місце, де заяви вважались передбаченнями богів; мудра людина.', cat: 'latin' },
  { word: 'Орнамент',       origin: 'латин. ornamentum',       def: 'Візерунок, прикраса; складений з повторюваних елементів мотив у мистецтві.', cat: 'latin' },
  { word: 'Пандемія',       origin: 'грецьк. πανδημία',       def: 'Епідемія, що охопила велику територію, кілька країн або весь світ.', cat: 'greek' },
  { word: 'Парадигма',      origin: 'грецьк. παράδειγμα',     def: 'Взірець, зразок; усталена система понять, яка визначає наукове мислення доби.', cat: 'greek' },
  { word: 'Парадокс',       origin: 'грецьк. παράδοξος',      def: 'Твердження, що суперечить очікуваному, але може виявитись істинним.', cat: 'greek' },
  { word: 'Пасіонарність',  origin: 'латин. passio',           def: 'Надлишок біохімічної енергії, що штовхає людей на самопожертву заради ідеї.', cat: 'latin' },
  { word: 'Патос',          origin: 'грецьк. πάθος',           def: 'Пристрасть, емоційне піднесення; щира, набута почуттями переконливість.', cat: 'greek' },
  { word: 'Поетика',        origin: 'грецьк. ποιητική',        def: 'Наука про закони і форми поетичної та літературної творчості.', cat: 'greek' },
  { word: 'Прерогатива',    origin: 'латин. praerogativa',    def: 'Виняткове право чи перевага, що належить комусь за законом або традицією.', cat: 'latin' },
  { word: 'Протест',        origin: 'латин. protestari',       def: 'Рішуче заперечення, відмова визнати щось; публічне виявлення незгоди.', cat: 'latin' },
  { word: 'Психологія',     origin: 'грецьк. ψυχολογία',      def: 'Наука про загальні закономірності психічної діяльності людини і тварин.', cat: 'greek' },
  { word: 'Рефлексія',      origin: 'латин. reflexio',         def: 'Звернення думки на саму себе; розмірковування над власним внутрішнім станом.', cat: 'latin' },
  { word: 'Ритуал',         origin: 'латин. ritualis',         def: 'Усталений порядок обрядових дій; перен. — будь-яка стала форма поведінки.', cat: 'latin' },
  { word: 'Романтизм',      origin: 'франц. romantisme',       def: 'Художній напрям, де царює уява, піднесення почуттів над розумом і буденністю.', cat: 'french' },
  { word: 'Сагa',           origin: 'давньосканд. saga',       def: 'Давньоскандинавська епічна оповідь про героїчні події і подвиги.', cat: 'german' },
  { word: 'Символ',         origin: 'грецьк. σύμβολον',       def: 'Умовний знак, що виражає глибший зміст; образ, що заміщує поняття.', cat: 'greek' },
  { word: 'Синдром',        origin: 'грецьк. σύνδρομον',      def: 'Сукупність ознак або явищ, що виникають разом і характеризують певний стан.', cat: 'greek' },
  { word: 'Скептицизм',     origin: 'грецьк. σκεπτικός',      def: 'Схильність до сумнівів; відмова прийняти щось без достатніх підстав.', cat: 'greek' },
  { word: 'Сонет',          origin: 'італ. sonetto',           def: 'Ліричний вірш із чотирнадцяти рядків з певною будовою rime та меланхолійним пафосом.', cat: 'latin' },
  { word: 'Стагнація',      origin: 'латин. stagnum',          def: 'Застій у господарстві, культурі; відсутність руху вперед.', cat: 'latin' },
  { word: 'Стоїцизм',       origin: 'грецьк. Στωϊκισμός',     def: 'Вміння стійко переносити труднощі та зберігати спокій перед лицем долі.', cat: 'greek' },
  { word: 'Тавтологія',     origin: 'грецьк. ταυτολογία',     def: 'Повторення того самого різними словами; зайва многослівність.', cat: 'greek' },
  { word: 'Таємниця',       origin: 'грецьк. μυστήριον',      def: 'Щось приховане, недоступне для чужого ока; те, про що замовчують.', cat: 'greek' },
  { word: 'Тираж',          origin: 'франц. tirage',            def: 'Кількість примірників видання, випущених одночасно; жеребкування.', cat: 'french' },
  { word: 'Тотем',          origin: 'оджибве ototeman',        def: 'Тварина, рослина або предмет, що є покровителем роду; сакральний символ.', cat: 'english' },
  { word: 'Традиція',       origin: 'латин. traditio',         def: 'Звичаї та погляди, що передаються з покоління в покоління як спадок минулого.', cat: 'latin' },
  { word: 'Трагедія',       origin: 'грецьк. τραγῳδία',       def: 'Драматичний твір з тяжким, нерідко сумним кінцем; жахлива подія в житті.', cat: 'greek' },
  { word: 'Утопія',         origin: 'грецьк. οὐτοπία',        def: 'Досконале суспільство, що існує лише в уяві; нездійсненна мрія.', cat: 'greek' },
  { word: 'Феномен',        origin: 'грецьк. φαινόμενον',     def: 'Явище, що сприймається органами чуттів; виняткова особа або подія.', cat: 'greek' },
  { word: 'Філіграні',      origin: 'латин. filum + granum',  def: 'Ажурна металева прикраса з дроту; перен. — надзвичайна витонченість роботи.', cat: 'latin' },
  { word: 'Хаос',           origin: 'грецьк. χάος',            def: 'Первісний безлад; відсутність організації, плутанина та розлад.', cat: 'greek' },
  { word: 'Харизма',        origin: 'грецьк. χάρισμα',        def: 'Виняткові особисті якості, здатні впливати на людей та надихати їх.', cat: 'greek' },
  { word: 'Хроніка',        origin: 'грецьк. χρονικά',        def: 'Запис подій у хронологічній послідовності; документальна оповідь.', cat: 'greek' },
  { word: 'Цивілізація',    origin: 'латин. civilis',          def: 'Рівень суспільного розвитку та культури; сукупність матеріальних і духовних досягнень.', cat: 'latin' },
  { word: 'Циніzм',         origin: 'грецьк. κυνισμός',       def: 'Зневажливе ставлення до духовних цінностей; безсоромна відвертість.', cat: 'greek' },
  { word: 'Цитата',         origin: 'латин. citatus',          def: 'Дослівно відтворений уривок чийогось тексту або мовлення; витяг.', cat: 'latin' },
  { word: 'Шедевр',         origin: 'франц. chef-d\'œuvre',   def: 'Найвидатніший твір митця; неперевершений зразок майстерності.', cat: 'french' },
  { word: 'Шифр',           origin: 'ар. ṣifr',               def: 'Умовна система символів для таємного писання; ключ до секретного повідомлення.', cat: 'latin' },
  { word: 'Ямб',            origin: 'грецьк. ἴαμβος',         def: 'Двоскладова стопа з наголосом на другому складі; основний розмір античної поезії.', cat: 'greek' },
];

// ─── State ────────────────────────────────────────────────────
const state = {
  words:         [...CURATED_WORDS],
  filteredWords: [...CURATED_WORDS],
  fullIndex:     [], // This will hold 100,000+ words
  currentIndex:  0,
  autoMode:      false,
  autoInterval:  null,
  autoDelay:     8,
  animType:      'fade',
  showEtymology: true,
  fixedFont:     false,
  sizeClass:     'md',
  activeCategory:'all',
  activeSource:  'all',
  lastFontIndex: -1,
  progressTimer: null,
  isAnimating:   false,
  isLoadingData: false,
};

// URL to a massive Ukrainian frequency list (approx 200k+ words)
const GLOBAL_WORDLIST_URL = 'https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2016/uk/uk_full.txt';

// ─── DOM refs ─────────────────────────────────────────────────
const DOM = {
  wordTitle:    document.getElementById('word-title'),
  wordDef:      document.getElementById('word-definition'),
  wordOrigin:   document.getElementById('word-origin'),
  wordCounter:  document.getElementById('word-counter'),
  wordCard:     document.getElementById('word-card'),
  progressBar:  document.getElementById('progress-bar'),
  btnRandom:    document.getElementById('btn-random'),
  btnAuto:      document.getElementById('btn-auto'),
  btnSettings:  document.getElementById('btn-settings'),
  settingsPanel:document.getElementById('settings-panel'),
  intervalRange:document.getElementById('interval-range'),
  intervalVal:  document.getElementById('interval-val'),
  toggleEtym:   document.getElementById('toggle-etymology'),
  toggleFont:   document.getElementById('toggle-fixed-font'),
};

// ─── Particle canvas ──────────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 55; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.5 + 0.1,
    });
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,169,110,${p.alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
}

// ─── Font picking ──────────────────────────────────────────────
function pickFont() {
  if (state.fixedFont) return CALLIGRAPHIC_FONTS[0];
  let idx;
  do { idx = Math.floor(Math.random() * CALLIGRAPHIC_FONTS.length); }
  while (idx === state.lastFontIndex && CALLIGRAPHIC_FONTS.length > 1);
  state.lastFontIndex = idx;
  return CALLIGRAPHIC_FONTS[idx];
}

// ─── Render word ───────────────────────────────────────────────
function renderWord(entry) {
  const font = pickFont();
  DOM.wordTitle.style.fontFamily = font.style;
  DOM.wordDef.style.fontFamily   = font.italic
    ? font.style.replace('serif', 'serif').replace('cursive','cursive')
    : "'EB Garamond', serif";

  DOM.wordTitle.textContent  = entry.word;
  DOM.wordDef.textContent    = entry.def || '...';

  if (state.showEtymology && entry.origin) {
    DOM.wordOrigin.textContent = '— ' + entry.origin;
    DOM.wordOrigin.style.display = '';
  } else {
    DOM.wordOrigin.textContent = '';
    DOM.wordOrigin.style.display = 'none';
  }

  const total = state.filteredWords.length;
  const idx   = state.currentIndex + 1;
  DOM.wordCounter.textContent =
    String(idx).padStart(3,'0') + ' / ' + String(total).padStart(3,'0');
}

// ─── Animate transition ────────────────────────────────────────
const ANIM_MAP = {
  fade:  { exit: 'anim-exit-fade',  enter: 'anim-enter-fade'  },
  slide: { exit: 'anim-exit-slide', enter: 'anim-enter-slide' },
  blur:  { exit: 'anim-exit-blur',  enter: 'anim-enter-blur'  },
};

function transition(fn) {
  if (state.isAnimating) return;
  state.isAnimating = true;

  const anim = ANIM_MAP[state.animType];
  const card  = DOM.wordCard;

  card.classList.add(anim.exit);

  setTimeout(() => {
    fn();
    card.classList.remove(anim.exit);
    card.classList.add(anim.enter);

    card.addEventListener('animationend', () => {
      card.classList.remove(anim.enter);
      state.isAnimating = false;
    }, { once: true });
  }, 420);
}

// ─── Show word by index ────────────────────────────────────────
async function showWord(index) {
  const words = state.filteredWords;
  if (!words.length) return;

  state.currentIndex = ((index % words.length) + words.length) % words.length;
  const currentEntry = words[state.currentIndex];

  // If word is just a string (from 100k index), fetch definition
  if (typeof currentEntry === 'string' || !currentEntry.def) {
    DOM.wordCard.classList.add('is-loading');
    const wordKey = typeof currentEntry === 'string' ? currentEntry : currentEntry.word;
    
    // Preliminary render title
    DOM.wordTitle.textContent = wordKey;
    DOM.wordDef.textContent = 'Шукаємо тлумачення...';
    DOM.wordOrigin.textContent = '';

    const data = await fetchWiktionaryWord(wordKey);
    DOM.wordCard.classList.remove('is-loading');
    
    if (data) {
      if (typeof words[state.currentIndex] === 'string') {
        words[state.currentIndex] = data; // Cache it
      } else {
        Object.assign(words[state.currentIndex], data);
      }
      renderWord(data);
    } else {
      renderWord({ word: wordKey, origin: 'Архів', def: '...' });
    }
  } else {
    renderWord(currentEntry);
  }
  
  resetProgress();
}

function nextWord() {
  transition(() => showWord(state.currentIndex + 1));
}

function prevWord() {
  transition(() => showWord(state.currentIndex - 1));
}

function randomWord() {
  const words = state.filteredWords;
  if (words.length <= 1) { transition(() => renderWord(words[0])); return; }
  let idx;
  do { idx = Math.floor(Math.random() * words.length); }
  while (idx === state.currentIndex);
  transition(() => showWord(idx));
}

// ─── Progress bar for auto ────────────────────────────────────
function resetProgress() {
  clearInterval(state.progressTimer);
  DOM.progressBar.style.transition = 'none';
  DOM.progressBar.style.width = '0%';

  if (!state.autoMode) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      DOM.progressBar.style.transition = `width ${state.autoDelay}s linear`;
      DOM.progressBar.style.width = '100%';
    });
  });
}

// ─── Auto mode ────────────────────────────────────────────────
function startAuto() {
  state.autoMode = true;
  DOM.btnAuto.classList.add('active');
  const btnIcon = DOM.btnAuto.querySelector('.btn-icon');
  if (btnIcon) btnIcon.textContent = '◉';
  resetProgress();
  state.autoInterval = setInterval(() => nextWord(), state.autoDelay * 1000);
}

function stopAuto() {
  state.autoMode = false;
  DOM.btnAuto.classList.remove('active');
  const btnIcon = DOM.btnAuto.querySelector('.btn-icon');
  if (btnIcon) btnIcon.textContent = '◉';
  DOM.progressBar.style.width = '0%';
  DOM.progressBar.style.transition = 'none';
  clearInterval(state.autoInterval);
  clearInterval(state.progressTimer);
}

function toggleAuto() {
  state.autoMode ? stopAuto() : startAuto();
}

// ─── Wiktionary API fetch ──────────────────────────────────────
async function fetchWiktionaryWord(queryWord) {
  try {
    const url = `https://uk.wiktionary.org/w/api.php?action=query&titles=${encodeURIComponent(queryWord)}&prop=extracts&exintro=1&explaintext=1&format=json&origin=*`;
    const res  = await fetch(url);
    const data = await res.json();
    const pages = data.query.pages;
    const page  = Object.values(pages)[0];
    
    if (page.missing || !page.extract) return null;
    
    const raw = page.extract.trim();
    // Simple cleaning of Wiktionary extract
    const cleanDef = raw.split('\n').filter(l => l.trim().length > 5 && !l.includes('=='))[0] || raw;
    
    return { 
      word: queryWord, 
      origin: 'Вікісловник', 
      def: cleanDef.slice(0, 350).replace(/\[.*?\]/g, '').trim() + (cleanDef.length > 350 ? '...' : ''), 
      cat: 'all' 
    };
  } catch (err) { 
    console.error('Wiktionary error:', err);
    return null; 
  }
}

// ─── Large Wordlist Fetching ──────────────────────────────────
async function fetchLargeWordlist() {
  try {
    const response = await fetch(GLOBAL_WORDLIST_URL);
    const text = await response.text();
    // Format is "word frequency\n"
    const allWords = text.split('\n')
      .map(line => line.split(' ')[0].trim()) // Take the word part
      .filter(w => w.length > 3 && w.length < 20 && !/[a-zA-Z0-9]/.test(w));
    
    state.fullIndex = allWords;
    console.log(`Loaded ${state.fullIndex.length} words into index.`);
    
    // Immediate rebuild if we are in "All" mode
    if (state.activeSource !== 'curated') {
      rebuildWordList();
    }
  } catch (err) {
    console.warn('Could not load global wordlist. Falling back to curated words.', err);
  }
}

// ─── Filter / rebuild word list ────────────────────────────────
function rebuildWordList() {
  let pool = [];

  if (state.activeSource === 'curated') {
    pool = [...CURATED_WORDS];
  } else if (state.activeSource === 'wiktionary') {
    // Pick a random selection from the 100k index to keep performance high
    // or just use the full index if browsing experience should be infinite
    pool = state.fullIndex.length ? [...state.fullIndex] : [...CURATED_WORDS];
  } else {
    pool = [...CURATED_WORDS, ...state.fullIndex];
  }

  if (state.activeCategory !== 'all' && state.activeSource === 'curated') {
    pool = pool.filter(w => w.cat === state.activeCategory);
  }

  if (!pool.length) pool = [...CURATED_WORDS];

  // For very large pools, we don't shuffle the whole thing (to save memory)
  // Instead we just randomize the current index access or shuffle a subset
  
  state.filteredWords = pool; // In "infinite" mode, we just keep it
  
  // Reset index to a random starting point
  state.currentIndex = Math.floor(Math.random() * pool.length);
  showWord(state.currentIndex);
}

// ─── Settings panel ───────────────────────────────────────────
function toggleSettings() {
  const panel = DOM.settingsPanel;
  if (panel.classList.contains('hidden')) {
    panel.classList.remove('hidden');
    panel.classList.add('open');
    requestAnimationFrame(() => panel.classList.add('visible'));
  } else {
    panel.classList.remove('visible');
    setTimeout(() => {
      panel.classList.remove('open');
      panel.classList.add('hidden');
    }, 320);
  }
}

function closeSettingsIfOutside(e) {
  const panel = DOM.settingsPanel;
  if (!panel.classList.contains('visible')) return;
  if (!panel.contains(e.target) && e.target !== DOM.btnSettings && !DOM.btnSettings.contains(e.target)) {
    panel.classList.remove('visible');
    setTimeout(() => {
      panel.classList.remove('open');
      panel.classList.add('hidden');
    }, 320);
  }
}

// ─── Filter buttons ───────────────────────────────────────────
function initFilterButtons() {
  document.querySelectorAll('[data-source]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-source]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeSource = btn.dataset.source;
      rebuildWordList();
    });
  });

  document.querySelectorAll('[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.dataset.category;
      rebuildWordList();
    });
  });

  document.querySelectorAll('[data-size]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-size]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.body.classList.remove('size-sm','size-md','size-lg');
      document.body.classList.add('size-' + btn.dataset.size);
      state.sizeClass = btn.dataset.size;
    });
  });

  document.querySelectorAll('[data-anim]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-anim]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.animType = btn.dataset.anim;
    });
  });
}

// ─── Keyboard & swipe ─────────────────────────────────────────
let touchStartX = 0;
let touchStartY = 0;

function initInteractions() {
  // Click stage → next word
  document.querySelector('.word-stage').addEventListener('click', e => {
    if (e.target.closest('button') || e.target.closest('.settings-panel')) return;
    nextWord();
  });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextWord(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prevWord(); }
    if (e.key === 'r' || e.key === 'R') randomWord();
    if (e.key === 'a' || e.key === 'A') toggleAuto();
    if (e.key === 'Escape') {
      if (!DOM.settingsPanel.classList.contains('hidden')) toggleSettings();
    }
  });

  // Touch swipe
  document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      dx < 0 ? nextWord() : prevWord();
    }
  }, { passive: true });
}

// ─── Init ─────────────────────────────────────────────────────
async function init() {
  initParticles();

  // Buttons
  DOM.btnRandom.addEventListener('click', e => { e.stopPropagation(); randomWord(); });
  DOM.btnAuto.addEventListener('click', e => { e.stopPropagation(); toggleAuto(); });
  DOM.btnSettings.addEventListener('click', e => { e.stopPropagation(); toggleSettings(); });

  document.addEventListener('click', closeSettingsIfOutside);

  // Interval range
  DOM.intervalRange.addEventListener('input', () => {
    const val = parseInt(DOM.intervalRange.value);
    state.autoDelay = val;
    DOM.intervalVal.textContent = val + 'с';
    if (state.autoMode) { stopAuto(); startAuto(); }
  });

  // Toggles
  DOM.toggleEtym.addEventListener('change', () => {
    state.showEtymology = DOM.toggleEtym.checked;
    showWord(state.currentIndex);
  });

  DOM.toggleFont.addEventListener('change', () => {
    state.fixedFont = DOM.toggleFont.checked;
  });

  initFilterButtons();
  initInteractions();

  // Initial render
  state.filteredWords = [...CURATED_WORDS];
  state.currentIndex  = Math.floor(Math.random() * CURATED_WORDS.length);
  showWord(state.currentIndex);

  // Load the 200,000 words index in background
  fetchLargeWordlist();
}

document.addEventListener('DOMContentLoaded', init);
