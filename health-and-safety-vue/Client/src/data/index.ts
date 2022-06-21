import { StatusType } from '@/typings/StatusType'
import { StoryType } from '@/typings/StoryType'

export interface TreeViewType {
  key: string
  label: string
  data: string
  icon: string
  children?: TreeViewType[]
}

export const sections: TreeViewType[] = [
  {
    key: '0',
    label: 'Food Production',
    data: 'Food Production',
    icon: 'pi pi-fw pi-apple',
    children: [
      {
        key: '0-0',
        label: 'South Africa',
        data: 'Food Production > South Africa',
        icon: 'pi pi-fw pi-flag',
        children: [
          {
            key: '0-0-0',
            label: 'Meat Industry',
            icon: 'pi pi-fw pi-plus',
            data: 'Food Production > South Africa > Meat Industry',
          },
          {
            key: '0-0-1',
            label: 'Vegtable Production',
            icon: 'pi pi-fw pi-plus',
            data: 'Food Production > South Africa > Vegtable Production',
          },
        ],
      },
      {
        key: '0-1',
        label: 'UK',
        data: 'Food Production > UK',
        icon: 'pi pi-fw pi-flag',
        children: [
          {
            key: '0-1-0',
            label: 'Meat Industry',
            icon: 'pi pi-fw pi-plus',
            data: 'Food Production > UK > Meat Industry',
          },
          {
            key: '0-1-1',
            label: 'Vegtable Production',
            icon: 'pi pi-fw pi-plus',
            data: 'Food Production > UK > Vegtable Production',
          },
        ],
      },
    ],
  },
  {
    key: '1',
    label: 'Renewables Production',
    data: 'Renewables Production',
    icon: 'pi pi-fw pi-sun',
    children: [
      {
        key: '1-0',
        label: 'South Africa',
        data: 'Renewables Production > South Africa',
        icon: 'pi pi-fw pi-flag',
        children: [
          {
            key: '1-0-0',
            label: 'Wind Production',
            icon: 'pi pi-fw pi-plus',
            data: 'Renewables Production > South Africa > Wind',
          },
          {
            key: '1-0-1',
            label: 'Solar Production',
            icon: 'pi pi-fw pi-plus',
            data: 'Renewables Production > South Africa > Solar',
          },
          {
            key: '1-0-2',
            label: 'Hydro Production',
            icon: 'pi pi-fw pi-plus',
            data: 'Renewables Production > South Africa > Hydro',
          },
        ],
      },
      {
        key: '1-1',
        label: 'UK',
        data: 'Renewables Production > UK',
        icon: 'pi pi-fw pi-flag',
        children: [
          {
            key: '1-1-0',
            label: 'Wind Production',
            icon: 'pi pi-fw pi-plus',
            data: 'Renewables Production > UK > Wind',
          },
          {
            key: '1-1-1',
            label: 'Solar Production',
            icon: 'pi pi-fw pi-plus',
            data: 'Renewables Production > UK > Solar',
          },
          {
            key: '1-1-2',
            label: 'Hydro Production',
            icon: 'pi pi-fw pi-plus',
            data: 'Renewables Production > UK > Hydro',
          },
        ],
      },
    ],
  },
]

export const statuses: StatusType[] = [
  {
    id: 1,
    description: 'ERROR',
    colour: 'red',
  },
  {
    id: 2,
    description: 'Under Investigation',
    colour: 'orange',
  },
  {
    id: 3,
    description: 'Reported',
    colour: 'green',
  },
]

export const impactOptions = ['Sustainability', 'Environment', 'Internal', 'Safety', 'Health', 'Renewables', 'Audit']

export const eventOptions = ['Incident', 'Near-Miss', 'Event']

export const userStories: StoryType[] = [
  {
    id: 1,
    title: '1. Breadcrumbs Component',
    description:
      'As a User I would like to see a breadcrumb bar which indicates where abouts on the site I am. In addition I would like to see the current location in the page title.',
  },
  {
    id: 2,
    title: '2. View All Records',
    description: 'As a User I would like to view all the incident records from the API in a DataTable.',
  },
  {
    id: 3,
    title: '3. Add New Record',
    description: 'As a User I would like to be able to add a new incident record.',
  },
]
