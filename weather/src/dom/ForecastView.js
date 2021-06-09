export const renderExpandForecastBtn = (el) => {
    console.log('revealing button to show 5 day forecast');
    return el.classList.remove('hidden');
}

const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const dayOfWeek = () => {
    const day = 'day';
    //logic to figure out day

    return day
}

export const renderForecastView = (arr, append, table) => {
    console.log('rendering forecast view');

    for(let i = 0; i < arr.length ; i++) {

        const row = `
        <tr>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                <div class="flex items-center">
                    <div class="ml-3">
                        <p class="text-gray-900 whitespace-no-wrap">
                            ${dayOfWeek()}
                        </p>
                    </div>
                </div>
            </td>

            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap text-center">${Math.round(arr[i].main.temp_max)}</p>
            </td>

            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap text-center">
                    ${Math.round(arr[i].main.temp_min)}
                </p>
            </td>

            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                <div class="flex items-center float-right">
                    <div class="mr-3">
                        <p class="text-gray-900 whitespace-no-wrap text-right">
                            ${Math.round(arr[i].main.feels_like)}
                        </p>
                    </div>
                </div>
            </td>
        </tr>
        `

        table.classList.remove('hidden');
        // append.appendChild(row);
        append.insertAdjacentHTML('beforeend', row);
    }


}

{/* <tr>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
        <div class="flex items-center">
            <div class="flex-shrink-0 w-10 h-10 hidden sm:table-cell">
                <img class="w-full h-full rounded-full"
                    src="https://images.unsplash.com/photo-1601046668428-94ea13437736?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80"
                    alt="" />
            </div>
            <div class="ml-3">
                <p class="text-gray-900 whitespace-no-wrap">
                    Team 3
                </p>
            </div>
        </div>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p class="text-gray-900 whitespace-no-wrap text-center">0</p>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p class="text-gray-900 whitespace-no-wrap text-center">
            3
        </p>
    </td>
    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
        <div class="flex items-center float-right">
            <div class="mr-3">
                <p class="text-gray-900 whitespace-no-wrap text-right">
                    Team 4
                </p>
            </div>
            <div class="flex-shrink-0 w-10 h-10 hidden sm:table-cell">
                <img class="w-full h-full rounded-full"
                    src="https://images.unsplash.com/photo-1601046668428-94ea13437736?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80"
                    alt="" />
            </div>
        </div>
    </td>
</tr> */}