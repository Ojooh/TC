
<script>
    import axios from '@/helpers/api';

    import { RouterLink } from 'vue-router'
    import { useUserStore } from '../../stores/user';
    

    export default {
        props: {
            views : Object,
            table : Boolean,
            grid  : Boolean,
            url   : String,
        },
        data() {
            return {

                urows : [],
                rows : [],
            };
        },
        methods: {
            async fetchRecords(config) {
                let rows
                this.$parent.loading = true;
                await axios(config)
                .then((response) => {
                    this.$parent.loading = false;
                    response = response.data;
                    console.log(response)
                        
                    if (response.status == "error") {
                        this.$parent.state = true;
                        this.$parent.status = 'error';
                        this.$parent.msg = response.msg;
                    } else {
                        this.$parent.state = true;
                        this.$parent.status = 'success';
                        this.$parent.msg = response.msg
                        this.urows = response.data.items;
                        this.rows = response.data.items
                    }
                })
                .catch((err) => {
                    let msg;
                    this.$parent.loading = false;
                    console.log(err)
                    if (err && err.response && err.response.data && err.response.data.msg) {
                        msg = err.response.data.msg;
                    }
                    else {
                        msg = `${err.message}`;
                    }
                    this.$parent.state = true;
                    this.$parent.status = 'error';
                    this.$parent.msg = msg
                });

            }
            
        },
        created: async function() {
            const config = {
                method: 'get',
                url: this.url,
            };
            await this.fetchRecords(config);
            
        }
}

</script>




<template>
    <div class="container">
		<table v-if="table" class="w-full flex flex-row flex-no-wrap bg-table overflow-hidden sm:shadow-lg my-5 table-fixed">
			<thead class="text-white">
                <!-- v-for  -->
				<tr :v-for="row in rows" class="bg-thead flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
					<th class="p-4 text-left" width="30px">
                        <input type="checkbox" class="indeterminate:bg-gray-300" />
                    </th>
					<th v-for="item in Object.keys(views)" class="p-4 text-left">
                        {{ item }}
                    </th>
					<th class="p-4 text-left" width="110px">Actions</th>
				</tr>
				
			</thead>
			<tbody class="flex-1 sm:flex-none">
                <!-- v-for -->
				<tr v-for="row in rows" class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
					<td class="p-4">
                        <input type="checkbox" class="indeterminate:bg-gray-300" />
                    </td>
					<td v-for="item in Object.keys(views)" class="p-4 truncate">
                        <div v-if="item == 'Member' " class="flex md:flex-row flex-col items-center">
                            <img class="w-14 h-14 rounded-full" />
                            <strong class="text-white text3xl text-sm font-medium dark:text-slate-200">
                                here
                            </strong>
            
                        </div>
                        <div v-else>
                            {{ row[views[item]] }}
                        </div>
                    </td>
					<td class="p-4 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                       <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                    </td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style>
@media (min-width: 640px) {
    table {
      display: inline-table !important;
    }

    thead tr:not(:first-child) {
      display: none;
    }
  }

  td:not(:last-child) {
    border-bottom: 0;
  }

  tr {
    border: none !important;
    border-bottom: 1px solid rgba(112, 112, 112, 0.9) !important;
  }

  th {
    border-bottom: 1px solid rgba(112, 112, 112, 0.9);
  }

  .bg-thead {
    background: #333333;
    color: #fff;
  }

  .bg-table {
    background: #2F2E2E;
    border-radius: 5px;
    color: #fff;

  }
</style>