<!-- To allow the component to accept data, you need to use the 'export let' syntax
     If you need any Evidence components inside your custom component, you must import them explicitly -->
     <script>
        export let query;
        export let swapXY=false;
        import { BarChart } from '@evidence-dev/core-components';
    </script>
    
    <p>
        Here is a BarChart in a Component, with some accompanying text. Components stored in the
        /components/ folder will be included in your project.
    </p>
    
    <BarChart 
        data={query} 
        swapXY={swapXY}
    />