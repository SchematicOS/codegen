import Reconciler, { HostConfig } from 'react-reconciler'
import type { ReactNode } from 'react'
import { DefaultEventPriority } from 'react-reconciler/constants.js'
import {
  HostContext,
  HydratableInstance,
  NoTimeout,
  Props,
  PublicInstance,
  SuspenseInstance,
  TimeoutHandle,
  Type,
  UpdatePayload,
  _ChildSet
} from '@/types.ts'
import { TextInstance } from '@/elements/TextInstance.ts'
import { Container } from '@/elements/Container.ts'
import { Instance, createInstance } from '@/elements/createInstance.ts'

const hostConfig: HostConfig<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  SuspenseInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  _ChildSet,
  TimeoutHandle,
  NoTimeout
> = {
  // type: Type
  // props: Props
  // rootContainer: Container
  // hostContext: HostContext
  // internalHandle: OpaqueHandle
  createInstance(type: Type, props: Props, rootContainer: Container): Instance {
    // console.log('CREATE INSTANCE', type, props, rootContainer)
    // return createElement(type, props, internalInstanceHandle);

    return createInstance(type, props, rootContainer)
  },

  createTextInstance(
    text: string
    // rootContainer: Container,
    // hostContext: HostContext,
    // internalHandle: OpaqueHandle
  ): TextInstance {
    // console.log('CREATE TEXT INSTANCE', text)
    return TextInstance.createInstance(text)
  },

  appendChild(parentInstance: Instance, child: Instance | TextInstance) {
    // console.log(
    //   `APPEND CHILD ${instanceType(child)} TO ${instanceType(parentInstance)}`
    // )

    parentInstance.appendChild(child)
  },

  appendInitialChild(parentInstance: Instance, child: Instance | TextInstance) {
    // console.log(
    //   `APPEND INITIAL CHILD ${instanceType(child)} TO ${instanceType(parentInstance)}`
    // )

    parentInstance.appendChild(child)
  },

  appendChildToContainer(container: Container, child: Instance | TextInstance) {
    // console.log(`APPEND CHILD TO CONTAINER ${instanceType(child)} TO CONTAINER`)

    container.appendChild(child)
  },

  insertBefore(
    parentInstance: Instance,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance
  ) {
    // console.log('insertBefore', parentInstance, child, beforeChild)

    const index = parentInstance.children.indexOf(beforeChild)
    parentInstance.children.splice(index, 0, child)
  },

  insertInContainerBefore(
    container: Container,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance
  ) {
    // console.log('insertInContainerBefore', container, child, beforeChild)

    const index = container.children.indexOf(beforeChild)
    container.children.splice(index, 0, child)
  },

  removeChild(parentInstance: Instance, child: Instance | TextInstance) {
    // console.log('removeChild', parentInstance, child)

    const index = parentInstance.children.indexOf(child)
    parentInstance.children.splice(index, 1)
  },

  removeChildFromContainer(
    container: Container,
    child: Instance | TextInstance
  ) {
    // console.log('removeChildFromContainer', container, child)

    const index = container.children.indexOf(child)
    container.children.splice(index, 1)
  },

  commitTextUpdate(
    textInstance: TextInstance,
    _oldText: string,
    newText: string
  ) {
    // console.log('commitTextUpdate', textInstance, oldText, newText)

    textInstance.text = newText
  },

  // instance: Instance
  // type: Type
  // newProps: Props
  commitMount() {
    // noop
  },

  commitUpdate(
    instance: Instance,
    _updatePayload: any,
    _type: Type,
    _oldProps: Props,
    newProps: Props
  ) {
    // console.log(
    //   'commitUpdate',
    //   instance,
    //   updatePayload,
    //   type,
    //   oldProps,
    //   newProps
    // )

    instance.props = newProps
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hideInstance(_instance: Instance) {
    // console.log(_'hideInstance', instance)
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hideTextInstance(_textInstance: TextInstance) {
    // console.log(_'hideTextInstance', textInstance)
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unhideInstance(_instance: Instance) {
    // console.log(_'unhideInstance', instance)
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unhideTextInstance(_textInstance: TextInstance) {
    // console.log('unhideTextInstance', textInstance)
  },

  clearContainer(container: Container) {
    // console.log('CLEAR CONTAINER')

    container.children = []
  },

  // instance: Instance,
  // type: Type,
  // props: Props,
  // rootContainer: Container,
  // hostContext: HostContext,
  finalizeInitialChildren() {
    return false
  },

  getPublicInstance(instance: Instance | TextInstance) {
    return instance
  },

  prepareForCommit() {
    // noop
    return null
  },

  // instance: Instance,
  // type: Type,
  // oldProps: Props,
  // newProps: Props,
  // rootContainer: Container,
  // hostContext: HostContext,
  prepareUpdate() {
    return true
  },

  getInstanceFromNode() {
    // noop
    return undefined
  },

  beforeActiveInstanceBlur() {
    // noop
  },

  afterActiveInstanceBlur() {
    // noop
  },

  // scopeInstance: any
  // instance: any
  prepareScopeUpdate() {
    // noop
  },

  // scopeInstance: any
  getInstanceFromScope() {
    // noop
    return null
  },

  resetAfterCommit() {
    // noop
  },

  // instance: Instance
  resetTextContent() {
    // noop
  },

  // node: Instance
  detachDeletedInstance() {
    // noop
  },

  // containerInfo: Container
  preparePortalMount() {
    // noop
  },

  // You can use this 'rootInstance' to pass data from the roots.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getRootHostContext(_rootInstance) {
    // console.log('getRootHostContext', rootInstance)

    return null
  },

  scheduleTimeout: setTimeout,

  cancelTimeout: clearTimeout,

  noTimeout: -1,

  supportsMicrotasks: true,

  // parentHostContext: HostContext,
  // type: Type,
  // rootContainer: Container
  getChildHostContext(parentHostContext: HostContext): HostContext {
    return parentHostContext
  },

  // type: Type
  // props: Props
  shouldSetTextContent() {
    return false
  },

  scheduleMicrotask: queueMicrotask,

  isPrimaryRenderer: true,

  getCurrentEventPriority() {
    return DefaultEventPriority
  },

  createContainerChildSet() {},

  supportsMutation: true,

  supportsPersistence: false,

  supportsHydration: false
}

const reconciler = Reconciler(hostConfig)

export const SchematicReact = {
  render(component: ReactNode, container: Container, callback: () => void) {
    const root = reconciler.createContainer(
      container,
      0,
      null,
      false,
      null,
      '',
      () => {},
      null
    )

    reconciler.updateContainer(component, root, null, callback)
  }
}

export const instanceType = (instance: Instance | TextInstance) => {
  return instance instanceof TextInstance ? 'text' : instance.type
}
