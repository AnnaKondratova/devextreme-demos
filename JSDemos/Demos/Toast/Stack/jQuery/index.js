let id = 1;
let direction = 'up';
let position = 'bottom center';

$(() => {
  $('#create').dxButton({
    text: 'Show',
    width: '48%',
    onClick() {
      DevExpress.ui.notify({
        message: `Toast ${id}`,
        height: 45,
        width: 150,
        type: types[Math.floor(Math.random() * 4)],
        displayTime: 3500,
        animation: {
          show: {
            type: 'fade', duration: 400, from: 0, to: 1,
          },
          hide: { type: 'fade', duration: 40, to: 0 },
        },
      },
      {
        position,
        direction,
      });
      id += 1;
    },
  });

  $('#hide').dxButton({
    text: 'Hide all',
    width: '48%',
    onClick() {
      DevExpress.ui.hideToasts();
    },
  });

  $('#radioGroup').dxRadioGroup({
    layout: 'horizontal',
    value: 'alias',
    items: ['alias', 'coordinates'],
    onValueChanged: ({ value }) => {
      const aliasSelected = value === 'alias';

      positionSelect.option('visible', aliasSelected);
      topNumberBox.option('visible', !aliasSelected);
      leftNumberBox.option('visible', !aliasSelected);
      bottomNumberBox.option('visible', !aliasSelected);
      rightNumberBox.option('visible', !aliasSelected);
      position = aliasSelected
        ? positionSelect.option('value')
        : {
          top: topNumberBox.option('value') || undefined,
          left: leftNumberBox.option('value') || undefined,
          bottom: bottomNumberBox.option('value') || undefined,
          right: rightNumberBox.option('value') || undefined,
        };
    },
  });

  const positionSelect = $('#position').dxSelectBox({
    items: positions,
    value: position,
    onSelectionChanged: (value) => { position = value; },
  }).dxSelectBox('instance');

  $('#direction').dxSelectBox({
    items: directions,
    value: direction,
    onSelectionChanged: (value) => { direction = value; },
  });

  const numberBoxValueChange = (value, pos, componentToDisable) => {
    position[pos] = value || undefined;
    componentToDisable.option('disabled', !!value);
  };

  const commonNumberBoxOptions = {
    value: '',
    width: '48%',
    visible: false,
    valueChangeEvent: 'keyup',
  };

  const topNumberBox = $('#positionTop').dxNumberBox({
    ...commonNumberBoxOptions,
    label: 'top',
    onValueChanged: ({ value }) => numberBoxValueChange(value, 'top', bottomNumberBox),
  }).dxNumberBox('instance');

  const bottomNumberBox = $('#positionBottom').dxNumberBox({
    ...commonNumberBoxOptions,
    label: 'bottom',
    onValueChanged: ({ value }) => numberBoxValueChange(value, 'bottom', topNumberBox),
  }).dxNumberBox('instance');

  const leftNumberBox = $('#positionLeft').dxNumberBox({
    ...commonNumberBoxOptions,
    label: 'left',
    onValueChanged: ({ value }) => numberBoxValueChange(value, 'left', rightNumberBox),
  }).dxNumberBox('instance');

  const rightNumberBox = $('#positionRight').dxNumberBox({
    ...commonNumberBoxOptions,
    label: 'right',
    onValueChanged: ({ value }) => numberBoxValueChange(value, 'right', leftNumberBox),
  }).dxNumberBox('instance');
});