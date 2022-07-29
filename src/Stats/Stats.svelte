<script lang="ts">
    import Alchemy from "../Api/Alchemy";
    export let contract: string;

    const contractMetadataPromise = Alchemy.nft.getContractMetadata(contract);
    const floorPricePromise = Alchemy.nft.getFloorPrice(contract);
    const ownersPromise = Alchemy.nft.getOwnersForContract(contract);

    const ownerStatsPromise = Promise.all([contractMetadataPromise, ownersPromise]);

    contractMetadataPromise.catch(function (error) {
        console.error('Contract data fetch error', error);
        contract = '';
    });

    floorPricePromise.catch(function (error) {
        console.error('Price fetch error', error);
        contract = '';
    });
</script>

<div>
    {#await contractMetadataPromise}
        {:then contractMetadata}
            <p class="my-4">Stats for {contractMetadata.name} ({contractMetadata.symbol})</p>
        {:catch error}
            <p class="my-4 error">Couldn't fetch contract metadata</p>
    {/await}
    {#await floorPricePromise}
        {:then floorPrice}
            {#if !floorPrice.openSea.hasOwnProperty('error')}
                <p class="my-4"><a href="{floorPrice.openSea.collectionUrl}" target="_blank"><img class="me-2" src="https://storage.googleapis.com/opensea-static/Logomark/Logomark-Transparent%20White.png" alt="OpenSea" height="45" />Lowest price: {floorPrice.openSea.floorPrice} ({floorPrice.openSea.priceCurrency})</a></p>
            {:else}
                <p class="my-4 error">Couldn't fetch prices for OpenSea</p>
            {/if}
            {#if !floorPrice.looksRare.hasOwnProperty('error')}
                <p class="my-4"><a href="{floorPrice.looksRare.collectionUrl}" target="_blank"><img class="me-2" src="images/looksrare-white.png" height="45" alt="LooksRare" />Lowest price: {floorPrice.looksRare.floorPrice} ({floorPrice.looksRare.priceCurrency})</a></p>
            {:else}
                <p class="my-4 error">Couldn't fetch prices for LooksRare</p>
            {/if}
        {:catch error}
            <p class="my-4 error">Couldn't fetch prices</p>
    {/await}
    {#await ownerStatsPromise}
        {:then ownerStats}
        <div class="accordion my-4" id="accordionOwnerStats">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOwnerStats">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOwnerStats" aria-expanded="false" aria-controls="collapseOwnerStats">
                        Supply: {ownerStats[0].totalSupply} - Owners: {ownerStats[1].owners.length} - Supply/Owner: {(ownerStats[0].totalSupply/ownerStats[1].owners.length).toFixed(2)}
                    </button>
                </h2>
                <div id="collapseOwnerStats" class="accordion-collapse collapse" aria-labelledby="headingOwnerStats" data-bs-parent="#accordionOwnerStats">
                    <div class="accordion-body">
                        {@html ownerStats[1].owners.join('<br />')}
                    </div>
                </div>
            </div>
        </div>
        {:catch error}
            <p class="my-4 error">Couldn't fetch owner stats</p>
    {/await}
</div>