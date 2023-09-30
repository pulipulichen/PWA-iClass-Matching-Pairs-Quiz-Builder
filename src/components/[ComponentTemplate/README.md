
````html
<ComponentTemplate 
  ref="ComponentTemplate"
  :db="db">
</ComponentTemplate>
````

````
ComponentTemplate: () => import(/* webpackChunkName: "components/ComponentTemplate" */ './ComponentTemplate/ComponentTemplate.vue'),
````