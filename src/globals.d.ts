/**
 * Ambient declarations for the Diamond monorepo.
 *
 * These are NOT copied into consumer projects - their bundlers (Next.js,
 * Vite, webpack, etc.) already ship their own shims. This file exists so
 * the Diamond authoring IDE stops flagging side-effect CSS imports in
 * registry components.
 */
declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.less";

declare module "*.svg" {
    const content: string;
    export default content;
}
