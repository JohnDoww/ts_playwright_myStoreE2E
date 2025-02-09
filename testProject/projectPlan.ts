/**

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
+++фікстури +++++++++++++++
+++налаштований playwright.config.ts ++++++++
+++pageobject для сторінок і модальних вікон +++(мінімум 5) +++++++++++++++++++
+++цикли, if  повинні бути використанні+++++
+++++використання DDT (параметризації)  підходу +++++мінімум в одному тесті
+++перевірка network request (хоча б одна)
+++тести повинні виконуватись на github actions

Непогано б було зробити: 
+++збереження сесії юзера і робота з кукі
----------налаштований eslint config
----------налаштовані імпорти в tsconfig 
++++тестування консольних помилок
???????????????використання композиції для роботи зі складними сторінками

Вимоги до тестів:
----тести повинні мати унікальні назви і розбиті по describe блоках
-----використовуйте test.step щоб зробити тести більш читабельними і підвищити читабельність репорту 
++++++тести повинні мати високорівневий код, +++ніяких locator, page, new…, for(), if(), ++++console.log  в тестах не повинно бути 
+++використання expect в середині тесту, або в +++середині pageObject на ваш вибір (враховуйте +++++цю специфіку під час дизайну pageObject 
-----(локатори приватні, або публічні)).

final work:
 * 1 ---- add readme file 
* 2 ---- add incapsulation where it's needed 
* 3 --- move some geeneral methods to heplers class and api request as well 
* for ex: wait for response can be used as helper, also poll where we wait till all elements 
 */

/////
/// components 
// -- base p
// 1 searchComponnent +++++++
// 2 cartLinkComponent ++++++
// 3 loader++++++++++++
// 3 userIndicatorComponent +++++++++++==
// -- user reg page 
// 4 registrationFormComponent+++++


////////// 
const a ='s';
// -- item page 
// 5 addToCartComponent ++++
// 6 bradCrumbComponent+++
// 7 OpenItemComponent+++++
// 8 addingItemConfirmationModalComponent+++++++++

// 9 itemAmountManagerComponent+++++
// -- Catalog page
// 10 filterSectionComponent 
// 11 catalogItemComponent
// -- CartPage
// 12 cartSummaryComponent
// -- UserPage 
// 13 -----
// -- OrderPage
// 13 deliveryFormComponent
// 14 shippingMethodComponent
// 15 finalConfirmationComponent 
