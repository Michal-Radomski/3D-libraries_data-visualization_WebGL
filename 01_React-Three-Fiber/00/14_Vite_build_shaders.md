When you import shaders in a Vite project using the `?raw` query parameter, like this:

```javascript
import vertCode from "./vertex.glsl?raw";
import fragCode from "./fragment.glsl?raw";
```

Vite treats these files as raw text and includes their contents directly into your JavaScript bundle. This means that the
shader code is not stored as separate files in the output directory after building with `vite build`.

Here's what happens to the shader code during the build process:

1. **Development Mode**: During development, Vite serves your project from the source directory. When you import shaders with
   `?raw`, Vite reads the shader files as text and includes them directly in your JavaScript modules. This allows you to see
   changes to the shaders immediately without needing to restart the server.

2. **Production Build**: When you run `vite build`, Vite bundles your JavaScript code along with the shader text into a
   single or multiple JavaScript files, depending on your configuration. The shader code is not written to separate files in
   the `dist` directory; instead, it is embedded within the JavaScript bundles.

To manage shaders effectively in a Vite project, you can keep them in a separate directory (e.g., `src/shaders/`) and import
them as needed. However, if you want to serve shaders as separate files (for example, to load them dynamically), you might
need to place them in the `public` directory, which Vite copies to the root of the `dist` directory during the build
process[5].

### Example Directory Structure

```plaintext
project/
├── public/
│   └── shaders/
│       ├── vertex.glsl
│       └── fragment.glsl
├── src/
│   ├── shaders/
│   │   ├── vertex.glsl
│   │   └── fragment.glsl
│   └── main.js
└── vite.config.js
```

In this setup, shaders in `src/shaders/` are imported with `?raw` for development, while those in `public/shaders/` are
served as separate files during both development and production.

### Vite Configuration

If you need more control over how assets are handled, you can customize the output paths in your `vite.config.js` file using
Rollup options[3][7]. However, for most use cases, importing shaders with `?raw` is sufficient and straightforward.

Citations: [1] https://stackoverflow.com/questions/75303107/importing-a-glsl-file-throws-an-error-vite-project [2]
https://www.youtube.com/watch?v=RDughHM9qoE [3]
https://forum.babylonjs.com/t/how-to-properly-set-up-a-vite-project-when-using-custom-shaders-and-shadermaterial/44193 [4]
https://forum.babylonjs.com/t/how-to-create-shader-ts-files-from-shader-fx-files/28143 [5]
https://www.restack.io/p/vite-react-assets-folder-answer [6] https://forum.babylonjs.com/t/vite-plugin-glsl/38547 [7]
https://vite.dev/guide/assets [8]
https://www.reddit.com/r/opengl/comments/2ze1fa/how_do_i_use_vertex_shaders_and_fragment_shaders/

---

Answer from Perplexity:
https://www.perplexity.ai/search/i-have-project-with-vite-and-s-.RBW.EeTT_iAUbzRbTh5jA?utm_source=copy_output
