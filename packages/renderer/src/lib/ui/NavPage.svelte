<script lang="ts">
export let title: string;
export let subtitle: string = '';
export let searchTerm = '';
export let searchEnabled: boolean = true;
</script>

<div class="flex flex-col min-h-full">
  <div class="min-w-full">
    <div class="flex">
      <div class="pt-5 px-5">
        <p class="text-xl capitalize">{title}</p>
        <p class="text-sm text-gray-400">
          {subtitle}
        </p>
      </div>
      <div class="flex flex-1 justify-end">
        <div class="py-5 px-5">
          <slot name="additional-actions">&nbsp;</slot>
        </div>
      </div>
    </div>
    {#if searchEnabled}
      <div class="flex flex-row pb-4">
        <div class="pt-2 pl-5 lg:w-[35rem] w-[22rem]">
          <div class="flex items-center bg-zinc-900 text-gray-400 rounded-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 ml-2 mr-2 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              bind:value="{searchTerm}"
              type="text"
              name="containerSearchName"
              placeholder="Search {title}...."
              class="w-full py-2 outline-none text-sm bg-zinc-900 rounded-sm text-gray-400 placeholder-gray-400" />
          </div>
        </div>
        <div class="flex flex-1 pt-4 px-5">
          <slot name="bottom-additional-actions">&nbsp;</slot>
        </div>
      </div>
    {/if}

    <slot name="table" />
  </div>

  <div class="flex flex-col container flex-1">
    <slot name="empty" />
  </div>
</div>
