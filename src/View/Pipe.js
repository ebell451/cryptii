
import BrickView from './Brick'
import Encoder from '../Encoder'
import View from '../View'

/**
 * Pipe View.
 */
export default class PipeView extends View {
  /**
   * Pipe constructor.
   */
  constructor () {
    super()

    this._$content = null
  }

  /**
   * Renders view.
   * @protected
   * @return {HTMLElement}
   */
  render () {
    this._$content = document.createElement('div')
    this._$content.classList.add('pipe__content')

    let $scrollable = document.createElement('div')
    $scrollable.classList.add('pipe__scrollable')
    $scrollable.appendChild(this._$content)

    // bind to existing pipe element if any
    let $root = document.querySelector('.pipe')

    if ($root === null) {
      $root.classList.add('pipe')
    }

    $root.appendChild($scrollable)
    return $root
  }

  integrateBrickViews () {
    let brickViews = this.getSubviews()
      .filter(view => view instanceof BrickView)

    this.getElement()
    let $content = this._$content

    // empty content element
    $content.innerHTML = ''

    let contentIndex = 1

    // add each brick and pipe parts
    brickViews.forEach(brickView => {
      let $pipePart = document.createElement('div')
      $pipePart.classList.add('pipe__part-pipe')
      contentIndex % 2 === 0 && $pipePart.classList.add('pipe__part-pipe--alt')
      $content.appendChild($pipePart)

      let $brickPart = document.createElement('div')
      $brickPart.classList.add('pipe__part-brick')
      contentIndex % 2 === 0 && $brickPart.classList.add('pipe__part-brick--alt')
      $brickPart.appendChild(brickView.getElement())
      $content.appendChild($brickPart)

      if (brickView.getModel() instanceof Encoder) {
        contentIndex++
      }
    })

    // add end part
    let $endPipePart = document.createElement('div')
    $endPipePart.classList.add('pipe__part-pipe')
    contentIndex % 2 === 0 && $endPipePart.classList.add('pipe__part-pipe--alt')
    $content.appendChild($endPipePart)

    return this
  }

  /**
   * Injects subview's root element into own DOM structure.
   * @protected
   * @param {View} view
   * @return {PipeView} Fluent interface
   */
  appendSubviewElement (view) {
    if (view instanceof BrickView) {
      this.integrateBrickViews()
      return this
    }
    return super.appendSubviewElement(view)
  }

  /**
   * Removes previously added subview element from own DOM structure.
   * @protected
   * @param {View} view
   * @return {PipeView} Fluent interface
   */
  removeSubviewElement (view) {
    super.removeSubviewElement(view)
    if (view instanceof BrickView) {
      this.integrateBrickViews()
    }
    return this
  }
}
