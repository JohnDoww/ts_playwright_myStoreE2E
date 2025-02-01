

/**
 * ---------------------------------------
 * Обовʼязково повинно бути покрите тестами такий функціонал як 
 * +++++++++++++++++ TEST1- пошук (+ результати пошуку)
 * +++++++++++++++++ TEST2- фільтри 
 * +++++++++++++++++++++ іконки товарів у пошуку і функціонал іконок
 * +++++++++++TEST3- сторінка деталей товару 
 * ++++++++= TEST4-6_ функціонал кошику товарів (збільшити, зменшити кількість товарів) 
 * -TEST10- сторінка оформлення замовлення (заповнення форми)
 * -- будь який функціонал на ваш вибір 

 * 
 * // describe search
 * ++++++++++++++++++++++test 1 - search - // this one also can be parametrised
 * search: input anu data and see that the first result contains input in header
 * ++++++++++++++++++++++tets 2 search - autocompete all results have my search test 
 * 
 * // DEscribe: filtering  
 * +++++++++++++++++++++test 3 - apply brends filter for category 
 * idea: we will putthere category of items and one or severaal prends. Then we will assert that all items on the page contains brand 1 or 2 or 3 or .....
 * 
 * // Describe: item page 
 * +++++++++++++=test 4 - preview information matchs with information in description
 * 
 * // create describe cart
 *  ++++ tets 5 - increase item quantity in cart 
 * ++++tets 6 - decrease item quantity in cart
 * ++++tets 7 - decrease item quantity in cart
 * +++test 8 - cart logo has item indicator 
 * 
 * // user registration
 * test 9 - registration ---- parametrised
 * // login user
 * test 10 - купить айтем як зарєганий юзер --- by using fixtures which creates a new user 
 * 
 * 
/**
 * 
 * 
Обовʼязково повинно бути використанні:
фікстури 
налаштований playwright.config.ts 
pageobject для сторінок і модальних вікон (мінімум 5) 
цикли, if  повинні бути використанні
використання DDT (параметризації)  підходу мінімум в одному тесті
перевірка network request (хоча б одна)
тести повинні виконуватись на github actions

Непогано б було зробити: 
збереження сесії юзера і робота з кукі
налаштований eslint config
налаштовані імпорти в tsconfig 
тестування консольних помилок
використання композиції для роботи зі складними сторінками

Вимоги до тестів:
тести повинні мати унікальні назви і розбиті по describe блоках
використовуйте test.step щоб зробити тести більш читабельними і підвищити читабельність репорту 
тести повинні мати високорівневий код, ніяких locator, page, new…, for(), if(), console.log  в тестах не повинно бути 
використання expect в середині тесту, або в середині pageObject на ваш вибір (враховуйте цю специфіку під час дизайну pageObject (локатори приватні, або публічні)).

 * 
 */