<script context="module" lang="ts">
    const POLICY_KEY = Symbol();
    export type PolicyContext = {
        transparentTableCells?: boolean;
    };

    const setCtx = (ctx: PolicyContext) => {
        setContext<PolicyContext>(POLICY_KEY, ctx);
    };

    export const getPolicyCtx = () => {
        return getContext<PolicyContext>(POLICY_KEY);
    };

    export const isInPolicy = () => {
        return hasContext(POLICY_KEY);
    };
</script>

<script lang="ts">
    import { FooterNav, MainFooter } from '$lib/components';

    import { Main } from '$lib/layouts';

    import { DEFAULT_HOST } from '$lib/utils/metadata';

    import { TITLE_SUFFIX } from '$routes/titles';

    import TocNav from '$lib/components/TocNav.svelte';
    import TocRoot from '$lib/components/TocRoot.svelte';
    import { isHeaderHidden } from '$lib/layouts/Main.svelte';
    import { getContext, hasContext, setContext } from 'svelte';

    export let title: string;
    export let description: string;
    export let transparentTableCells = false;

    let seo = {
        title: title + TITLE_SUFFIX,
        description: description,
        ogImage: DEFAULT_HOST + '/images/open-graph/website.png',

        APP_NAME: 'Appwrite'
    };

    let showToc = false;

    setCtx({ transparentTableCells });
</script>

<svelte:head>
    <!-- Titles -->
    <title>{seo.title}</title>
    <meta property="og:title" content={seo.title} />
    <meta name="twitter:title" content={seo.title} />
    <!-- Desscription -->
    <meta name="description" content={seo.description} />
    <meta property="og:description" content={seo.description} />
    <meta name="twitter:description" content={seo.description} />
    <!-- Image -->
    <meta property="og:image" content={seo.ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:image" content={seo.ogImage} />
    <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Main omitMainId>
    <TocRoot>
        <div class="web-container">
            <div class="web-grid-120-1fr-auto">
                <header class="web-grid-120-1fr-auto-header">
                    <h1 class="web-title web-u-color-text-primary">{title}</h1>
                </header>
                <button
                    class="toc-btn u-position-sticky u-flex u-width-full-line u-main-space-between u-cross-center
                web-u-padding-20 web-u-margin-inline-20-negative web-u-color-text-primary web-is-only-mobile
                u-margin-block-start-24 web-u-sep-block web-u-filter-blur-8"
                    style:--inset-block-start="4.5rem"
                    style:inline-size="100vw"
                    style:background-color="hsl(var(--p-body-bg-color) / 0.1)"
                    style:translate="0 {$isHeaderHidden ? '-4.5rem' : '0'}"
                    style:z-index="1"
                    on:click={() => (showToc = !showToc)}
                >
                    <span class="web-description">Table of contents</span>
                    <span class="icon-menu-alt-4" aria-hidden="true" />
                </button>
                <TocNav />
                <main class="web-grid-120-1fr-auto-main /web-is-mobile-closed" id="main">
                    <div class="web-content is-count-headers" class:web-is-mobile-closed={showToc}>
                        <!-- svelte-ignore a11y-hidden -->
                        <h2 aria-hidden="true">Introduction</h2>
                        <slot />
                    </div>
                </main>
            </div>
            <FooterNav />
            <MainFooter />
        </div>
    </TocRoot>
</Main>

<style lang="scss">
    h2[aria-hidden='true'] {
        height: 0;
        opacity: 0;
    }

    .toc-btn {
        transition: translate 0.3s ease;
    }
</style>
