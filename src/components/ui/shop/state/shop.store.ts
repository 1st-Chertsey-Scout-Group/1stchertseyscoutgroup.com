import { useStore } from '@nanostores/react'
import type { CollectionEntry } from 'astro:content'
import { atom, computed } from 'nanostores'

export interface ShopStateFilterOption {
    value: string;
    label: string;
    checked: boolean;
}

export interface ShopStateFilter {
    id: string;
    name: string;
    options: ShopStateFilterOption[];
}

enum SortOptions {
    "a-to-z" = "Name: A to Z",
    "z-to-a" = "Name: Z to A",
    "low-to-high" = "Price: Low to High",
    "high-to-low" = "Price: High to Low"
}

export interface ShopStateSort {
    name: SortOptions;
    checked: boolean;
}

type ShopState = {
    products: CollectionEntry<"products">[],
    inBasket: { product: CollectionEntry<"products">, quantity: number }[],
    categories: string[],
    mobileFiltersOpen: boolean,
    filters: ShopStateFilter[],
    sortOptions: ShopStateSort[]
}

const initialState: ShopState = {
    products: [],
    inBasket: [],
    categories: [],
    mobileFiltersOpen: false,
    filters: [],
    sortOptions: [
        {
            name: SortOptions['a-to-z'],
            checked: true
        },
        {
            name: SortOptions['z-to-a'],
            checked: false
        },
        {
            name: SortOptions['low-to-high'],
            checked: false
        },
        {
            name: SortOptions['high-to-low'],
            checked: false
        }
    ]
}

export const $shop = atom<ShopState>(initialState)

const initialise = (products: CollectionEntry<"products">[], params: URLSearchParams) => {

    let sectionDefault = params.get("section") || "";
    let requiredDefault = params.get("required") || "";
    let typeDefault = params.get("type") || "";

    let sections = products.flatMap(p => p.data.sections).filter((value, index, array) => array.indexOf(value) === index).map((s) => { var option: ShopStateFilterOption = { label: s, value: s.toLowerCase(), checked: s.toLowerCase() == sectionDefault.toLowerCase() }; return option; });
    let required = products.flatMap(p => p.data.required).filter((value, index, array) => array.indexOf(value) === index).map((s) => { var option: ShopStateFilterOption = { label: s, value: s.toLowerCase(), checked: s.toLowerCase() == requiredDefault.toLowerCase() }; return option; });
    let type = products.flatMap(p => p.data.type).filter((value, index, array) => array.indexOf(value) === index).map((s) => { var option: ShopStateFilterOption = { label: s, value: s.toLowerCase(), checked: s.toLowerCase() == typeDefault.toLowerCase() }; return option; });

    $shop.set({
        ...initialState,
        products,
        filters: [{
            id: "type",
            name: "Type",
            options: type
        }, {
            id: "sections",
            name: "Section",
            options: sections
        },
        {
            id: "required",
            name: "Required",
            options: required
        }]
    })
}

const addToBasket = (product: CollectionEntry<"products">) => {
    let shop = $shop.get();

    if (!isInCart(product.id)) {
        $shop.set({
            ...shop,
            inBasket: [...shop.inBasket, { product, quantity: 1 }]
        })
    }
}

const removeFromBasket = (product: CollectionEntry<"products">) => {
    let shop = $shop.get();
    if (isInCart(product.id)) {
        $shop.set({
            ...shop,
            inBasket: shop.inBasket.filter((p) => p.product != product)
        })
    }
}

const setMobileFiltersOpen = (mobileFiltersOpen: boolean) => {
    let shop = $shop.get();
    $shop.set({
        ...shop,
        mobileFiltersOpen
    })
}

const selectSortOption = (optionId: SortOptions) => {
    let shop = $shop.get();

    let sortOptions = shop.sortOptions;

    for (let i = 0; i < sortOptions.length; i++) {
        const option = sortOptions[i];

        option.checked = optionId == option.name
    }

    $shop.set({
        ...shop,
        sortOptions
    })
}

const toggleFilterOption = (filterId: string, optionId: string) => {
    let shop = $shop.get();

    let filters = shop.filters;

    let filter = filters.findIndex((f) => f.id == filterId);
    let option = filters[filter].options.findIndex((o) => o.value == optionId)

    filters[filter].options[option].checked = !filters[filter].options[option].checked;

    $shop.set({
        ...shop,
        filters
    })
}

const isInCart = (productId: string): boolean => {
    let shop = $shop.get();
    return shop.inBasket.findIndex(i => i.product.id == productId) != -1
}

const $filteredProducts = computed($shop, (shop) => {

    if (shop.products.length == 0 && shop.filters.length == 0) {
        return shop.products;
    }

    let filteredProducts: CollectionEntry<"products">[] = [];

    let sectionFilters = shop.filters.find((f) => f.id == "sections");
    let checkedSectionFilters = sectionFilters && sectionFilters.options.filter((o) => o.checked).map(o => o.label)

    let requiredFilters = shop.filters.find((f) => f.id == "required");
    let checkedRequiredFilters = requiredFilters && requiredFilters.options.filter((o) => o.checked).map(o => o.label)

    let typeFilters = shop.filters.find((f) => f.id == "type");
    let checkedTypeFilters = typeFilters && typeFilters.options.filter((o) => o.checked).map(o => o.label)

    if (checkedSectionFilters?.length == 0 && checkedRequiredFilters?.length == 0 && checkedTypeFilters?.length == 0) {
        filteredProducts = shop.products
    } else {
        for (let i = 0; i < shop.products.length; i++) {
            const product = shop.products[i];

            let toAdd = false;

            if (checkedTypeFilters && checkedTypeFilters.length > 0) {
                toAdd = checkedTypeFilters.includes(product.data.type)

                if (!toAdd) {
                    continue;
                }
            }

            if (checkedSectionFilters && checkedSectionFilters.length > 0) {
                toAdd = product.data.sections.some(s => checkedSectionFilters.includes(s))

                if (!toAdd) {
                    continue;
                }
            }

            if (checkedRequiredFilters && checkedRequiredFilters.length > 0) {
                toAdd = checkedRequiredFilters.includes(product.data.required)

                if (!toAdd) {
                    continue;
                }
            }

            if (toAdd) {
                filteredProducts.push(product)
            }
        }
    }

    let selectedSortOption = shop.sortOptions.find((s) => s.checked);

    if (selectedSortOption) {
        switch (selectedSortOption.name) {
            case SortOptions['a-to-z']:
                filteredProducts = filteredProducts.sort((a, b) => a.data.name.localeCompare(b.data.name))
                break;
            case SortOptions['z-to-a']:
                filteredProducts = filteredProducts.sort((a, b) => b.data.name.localeCompare(a.data.name))
                break;
            case SortOptions['high-to-low']:
                filteredProducts = filteredProducts.sort((a, b) => b.data.price - a.data.price)
                break;
            case SortOptions['low-to-high']:
                filteredProducts = filteredProducts.sort((a, b) => a.data.price - b.data.price)
                break;
        }
    }

    return filteredProducts;
});

const $totalPrice = computed($shop, (shop) => {
    return shop.inBasket.length == 0
        ? 0
        : shop.inBasket.map(item => item.product.data.price).reduce((prev, next) => prev + next);
})


export const useShop = () => {
    const shop = useStore($shop);
    const filteredProducts = useStore($filteredProducts);
    const totalPrice = useStore($totalPrice);

    return {
        ...shop,
        filteredProducts,
        totalPrice,
        actions: {
            initialise,
            addToBasket,
            removeFromBasket,
            setMobileFiltersOpen,
            toggleFilterOption,
            selectSortOption,
        },

        isInCart
    }
}