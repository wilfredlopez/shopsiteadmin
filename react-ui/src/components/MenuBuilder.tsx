import * as React from 'react'
import { Link } from 'react-router-dom'

import { IMegaMenuItem, CatChild, ISubCat } from '../api_types/ShopAppTypes'

import config from '../config'

//Ideally we get something like fake data from the server and then Map it
// const FAKEDATA: IMegaMenuItem[] = [
//   {
//     name: 'Wilfred',
//     link: '/wilfred',
//     subcategories: [
//       {
//         name: 'Exclusive Services',
//         link: '/exclusive/services.html',
//         children: [
//           {
//             name: 'Fragrance',
//             link: '/wilfred/fragrance',
//           },
//           {
//             name: 'Face Makeup',
//             link: '/wilfred/face-make-up',
//           },
//         ],
//       },
//       {
//         name: 'Men',
//         link: '/categories/men',
//         children: [
//           {
//             name: 'Cloathing',
//             link: '/men/cloathing',
//           },
//           {
//             name: 'Face Makeup',
//             link: '/wilfred/face-make-up',
//           },
//         ],
//       },
//     ],
//   },
// ]

// console.log(FAKEDATA)

// const sub: ISubCat = {
//   name: 'Exclusive Services',
//   link: '/exclusive/services.html',
//   children: [
//     {
//       name: 'Fragrance',
//       link: '/wilfred/fragrance',
//     },
//     {
//       name: 'Face Makeup',
//       link: '/wilfred/face-make-up',
//     },
//   ],
// }

// const FakeMegaMenuItem: IMegaMenuItem = {
//   name: 'Men',
//   link: '/categories/men',
//   subcategories: [
//     {
//       name: 'Cloathing',
//       link: '/categories/men/cloating',
//       children: [
//         {
//           name: 'Pants',
//           link: '/categories/men/cloathing/pants',
//         },
//       ],
//     },
//   ],
// }

// const FakeMegaMenuItem2: IMegaMenuItem = {
//   name: 'Tech',
//   link: '/categories/tech',
//   subcategories: [
//     {
//       name: 'Apple',
//       link: '/categories/tech/apple',
//       children: [
//         {
//           name: 'New',
//           link: '/categories/tech/apple/new',
//         },
//         {
//           name: 'Used',
//           link: '/categories/tech/apple/used',
//         },
//       ],
//     },
//   ],
// }

function BuildSubChild(child: CatChild) {
  return (
    <li
      key={child.link}
      className="mob-menu__submenu-item mob-menu__submenu-item--level-3 mob-menu__item level_3_list_item menu_list_item_2_1_1  cat_fragrance-engraving"
    >
      <Link
        className="mob-menu__submenu-link mob-menu__submenu-link--level-3 level_3_list_item_link category_link"
        to={child.link}
      >
        {child.name}
      </Link>
    </li>
  )
}

function BuildSubCat(subcategory: ISubCat) {
  return (
    <li
      key={subcategory.link}
      className="mob-menu__submenu-item mob-menu__submenu-item--level-2 mob-menu__item nav-item-mobile level_2_list_item menu_list_item_2_1  cat_features"
    >
      <div className="mob-menu__item-inner mob-menu__item-mobile nav-item-mobile-trigger">
        <Link
          to={subcategory.link}
          className="level_2_list_item_link level_2 category_link mob-menu__link mob-menu__submenu-link mob-menu__submenu-link--level-2 non_expandable"
          title="Exclusive Services"
        >
          {subcategory.name}
        </Link>

        <span className="mob-menu__submenu-arrow" />
      </div>

      <div className="mob-menu-dropdown mob-menu__dropdown">
        <div className="mob-menu_back-menu nav-item-mobile-back hidden show-for-version-3 hide-from-medium">
          <i className="mob-menu__back-icon icon-arrow-left" />
          <span className="mob-menu__back-text">Back</span>
        </div>
        <div className="mob-menu__show-all hidden show-for-version-3 hide-from-medium">
          <span className="mob-menu__show-all-text">{subcategory.name}</span>
          <Link className="mob-menu__show-all-link" to={subcategory.link}>
            See all
          </Link>
        </div>
        <ul className="mob-menu__submenu-list mob-menu__submenu-list--level-3 level_3_list menu_list_2_1">
          <div />
          {subcategory.children.map(child => {
            return BuildSubChild(child)
          })}
        </ul>
      </div>
    </li>
  )
}

function BuildMenu(menu: IMegaMenuItem) {
  return (
    <li
      key={menu.link}
      className={`level_1_list_item menu_list_item_2 main-nav__item cat_${menu.name}`}
      data-page={menu.name}
    >
      <Link
        className="level_1_list_item_link main-nav__link category_link Exclusives"
        to={menu.link}
        aria-expanded="false"
      >
        {menu.name}
        <span className="mobile_expand" />
      </Link>

      <span className="main-nav__submenu-arrow" />
      <div className="navigation_dropdown main-nav__dropdown" aria-hidden="true">
        <ul className="level_2_list menu_list_2 mob-menu__submenu-list mob-menu__submenu-list--level-2">
          {menu.subcategories.map(sub => {
            return BuildSubCat(sub)
          })}
        </ul>
      </div>
    </li>
  )
}

interface MenuBuilderProps {}
interface MenuBuilderState {
  cats: IMegaMenuItem[]
}

export class MenuBuilder extends React.PureComponent<MenuBuilderProps, MenuBuilderState> {
  constructor(props: MenuBuilderProps) {
    super(props)
    this.state = {
      cats: [],
    }
  }

  private async getCatList() {
    const res = await fetch(`${config.API_ENDPOINT}/api/products/category/list`)
    const cats: ReturnRes = await res.json()
    console.log(cats)

    let menuItems: IMegaMenuItem[] = []

    interface ReturnRes {
      main: CatChild[]
      subcategories: CatChild[]
    }

    let cat: IMegaMenuItem

    cats.main.map(c => {
      cat = {
        name: c.name,
        link: c.link,
        subcategories: [],
      }
      return menuItems.push(cat)
    })

    let subcat: ISubCat

    for (var savedCat of menuItems) {
      // eslint-disable-next-line
      cats.subcategories.forEach(sub => {
        if (savedCat.name === sub.main) {
          subcat = {
            name: sub.name,
            link: sub.link,
            children: [],
          }
          return savedCat.subcategories.push(subcat)
        }
      })
    }

    this.setState({ cats: menuItems })
  }
  componentDidMount() {
    this.getCatList()
  }
  public render(): React.ReactNode {
    return (
      <div className="main_navigation_wrapper main-nav__wrapper store-skin--version-3">
        <div className="navigation">
          <div className="navigation js_navigation loyalty-navigation">
            <div className="content">
              <ul className="level_1_list clearfix main-nav" id="navigation_skippy">
                {this.state.cats.map(c => {
                  return BuildMenu(c)
                })}
                {/* {BuildMenu(FakeMegaMenuItem)}
                {BuildMenu(FakeMegaMenuItem2)} */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// <div className="main_navigation_wrapper main-nav__wrapper store-skin--version-3">
//           <div className="navigation">
//             <div className="navigation js_navigation loyalty-navigation">
//               <div className="content">
//                 <ul className="level_1_list clearfix main-nav" id="navigation_skippy">
//                   <li
//                     className="level_1_list_item menu_list_item_2 main-nav__item cat_Exclusives"
//                     data-page="Exclusives"
//                   >
//                     <a
//                       className="level_1_list_item_link main-nav__link category_link Exclusives"
//                       href="https://www.yslbeautyus.com/exclusives/exclusive-services"
//                       aria-expanded="false"
//                     >
//                       Exclusives
//                       <span className="mobile_expand" />
//                     </a>

//                     <span className="main-nav__submenu-arrow" />
//                     <div className="navigation_dropdown main-nav__dropdown" aria-hidden="true">
//                       <ul className="level_2_list menu_list_2 mob-menu__submenu-list mob-menu__submenu-list--level-2">
//                         <li className="mob-menu__submenu-item mob-menu__submenu-item--level-2 mob-menu__item nav-item-mobile level_2_list_item menu_list_item_2_1  cat_features">
//                           <div className="mob-menu__item-inner mob-menu__item-mobile nav-item-mobile-trigger">
//                             <a
//                               href="https://www.yslbeautyus.com/exclusives/exclusive-services"
//                               className="level_2_list_item_link level_2 category_link mob-menu__link mob-menu__submenu-link mob-menu__submenu-link--level-2 non_expandable"
//                               title="Exclusive Services"
//                             >
//                               Exclusive Services
//                             </a>

//                             <span className="mob-menu__submenu-arrow" />
//                           </div>

//                           <div className="mob-menu-dropdown mob-menu__dropdown">
//                             <div className="mob-menu_back-menu nav-item-mobile-back hidden show-for-version-3 hide-from-medium">
//                               <i className="mob-menu__back-icon icon-arrow-left" />
//                               <span className="mob-menu__back-text">Back</span>
//                             </div>
//                             <div className="mob-menu__show-all hidden show-for-version-3 hide-from-medium">
//                               <span className="mob-menu__show-all-text">Exclusive Services</span>
//                               <a
//                                 className="mob-menu__show-all-link"
//                                 href="https://www.yslbeautyus.com/exclusives/exclusive-services"
//                               >
//                                 See all
//                               </a>
//                             </div>
//                             <ul className="mob-menu__submenu-list mob-menu__submenu-list--level-3 level_3_list menu_list_2_1">
//                               <li className="mob-menu__submenu-item mob-menu__submenu-item--level-3 mob-menu__item level_3_list_item menu_list_item_2_1_1  cat_fragrance-engraving">
//                                 <a
//                                   className="mob-menu__submenu-link mob-menu__submenu-link--level-3 level_3_list_item_link category_link"
//                                   href="https://www.yslbeautyus.com/exclusives/exclusive-services/fragrance-engraving"
//                                 >
//                                   Fragrance Engraving
//                                 </a>
//                               </li>

//                               <li className="mob-menu__submenu-item mob-menu__submenu-item--level-3 mob-menu__item level_3_list_item menu_list_item_2_1_2  cat_lipstick-engraving">
//                                 <a
//                                   className="mob-menu__submenu-link mob-menu__submenu-link--level-3 level_3_list_item_link category_link"
//                                   href="https://www.yslbeautyus.com/exclusives/exclusive-services/lipstick-engraving"
//                                 >
//                                   Lipstick Engraving
//                                 </a>
//                               </li>

//                               <li className="mob-menu__submenu-item mob-menu__submenu-item--level-3 mob-menu__item level_3_list_item menu_list_item_2_1_3  cat_mascara-engraving">
//                                 <a
//                                   className="mob-menu__submenu-link mob-menu__submenu-link--level-3 level_3_list_item_link category_link"
//                                   href="https://www.yslbeautyus.com/exclusives/exclusive-services/mascara-engraving"
//                                 >
//                                   Mascara Engraving
//                                 </a>
//                               </li>

//                               <li className="mob-menu__submenu-item mob-menu__submenu-item--level-3 mob-menu__item level_3_list_item menu_list_item_2_1_4  cat_face-makeup-engraving">
//                                 <a
//                                   className="mob-menu__submenu-link mob-menu__submenu-link--level-3 level_3_list_item_link category_link"
//                                   href="https://www.yslbeautyus.com/exclusives/exclusive-services/face-makeup-engraving"
//                                 >
//                                   Face Makeup Engraving
//                                 </a>
//                               </li>
//                             </ul>
//                           </div>
//                         </li>

//                         <li className="mob-menu__submenu-item mob-menu__submenu-item--level-2 mob-menu__item nav-item-mobile level_2_list_item menu_list_item_2_2  cat_discovery">
//                           <div className="mob-menu__item-inner mob-menu__item-mobile nav-item-mobile-trigger">
//                             <a
//                               href="javascript:void(0)"
//                               className="level_2_list_item_link level_2 category_link mob-menu__link mob-menu__submenu-link mob-menu__submenu-link--level-2 non_expandable"
//                               title="Discovery"
//                             >
//                               Discovery
//                             </a>

//                             <span className="mob-menu__submenu-arrow" />
//                           </div>

//                           <div className="mob-menu-dropdown mob-menu__dropdown">
//                             <div className="mob-menu_back-menu nav-item-mobile-back hidden show-for-version-3 hide-from-medium">
//                               <i className="mob-menu__back-icon icon-arrow-left" />
//                               <span className="mob-menu__back-text">Back</span>
//                             </div>
//                             <div className="mob-menu__show-all hidden show-for-version-3 hide-from-medium">
//                               <span className="mob-menu__show-all-text">Discovery</span>
//                               <a className="mob-menu__show-all-link" href="javascript:void(0)">
//                                 See all
//                               </a>
//                             </div>
//                             <ul className="mob-menu__submenu-list mob-menu__submenu-list--level-3 level_3_list menu_list_2_2">
//                               <li className="mob-menu__submenu-item mob-menu__submenu-item--level-3 mob-menu__item level_3_list_item menu_list_item_2_2_1  cat_find-your-foundation-custom-set">
//                                 <a
//                                   className="mob-menu__submenu-link mob-menu__submenu-link--level-3 level_3_list_item_link category_link"
//                                   href="https://www.yslbeautyus.com/find-your-perfect-foundation-match"
//                                 >
//                                   Try It On: Foundation Discovery Set
//                                 </a>
//                               </li>

//                               <li className="mob-menu__submenu-item mob-menu__submenu-item--level-3 mob-menu__item level_3_list_item menu_list_item_2_2_2 menu_list_item_last cat_find-your-foundation-shade">
//                                 <a
//                                   className="mob-menu__submenu-link mob-menu__submenu-link--level-3 level_3_list_item_link category_link"
//                                   href="https://www.yslbeautyus.com/find-my-foundation.html"
//                                 >
//                                   Find Your Foundation Shade
//                                 </a>
//                               </li>
//                             </ul>
//                           </div>
//                         </li>
//                       </ul>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
