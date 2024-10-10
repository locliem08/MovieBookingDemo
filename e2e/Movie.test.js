import { COLORS } from "@utils/styles";

describe('Movies Demo Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('Case: khi đặt vé xong thì nút "Đặt vé" thì vé sẽ được thêm vào tab Đã đặt', async () => {
    let indexItem = 0;
    let isBooked = true;

    while (isBooked) {
      const eListCard = await element(by.id('MovieCard-movies'));
      const lstElement = await eListCard.getAttributes();
      const strAllLabel = (lstElement.elements?.[indexItem] ?? lstElement).label;
      const titleMovie = strAllLabel.split('Nội dung phim')[0].trim();

      const buttonItem = await element(by.id('MovieCard-movies').withDescendant(by.text(titleMovie)));

      try { //Check xem phim đã được đặt vé chưa
        await expect(element(by.id(`Booked-${indexItem}`))).not.toBeVisible();
        isBooked = false;
      } catch (error) {
        indexItem++;
        continue;
      }

      await buttonItem.tap();
      await element(by.id('ConfirmBookingButton')).tap();
      await expect(element(by.id('MovieCard-booked').withDescendant(by.text(titleMovie)))).toBeVisible();
      await element(by.id('MoviesTab')).tap();
    }
  });

  it('Case: khi đặt vé xong thì nút "Đặt vé" ở danh sách và chi tiết sẽ bị vô hiệu hóa', async () => {
    let indexItem = 0;
    let isBooked = true;

    while (isBooked) {
      const eListCard = await element(by.id('MovieCard-movies'));
      const lstElement = await eListCard.getAttributes();
      const strAllLabel = (lstElement.elements?.[indexItem] ?? lstElement).label;
      const titleMovie = strAllLabel.split('Nội dung phim')[0].trim();

      const buttonItem = await element(by.id('MovieCard-movies').withDescendant(by.text(titleMovie)));

      try {
        await expect(element(by.id(`Booked-${indexItem}`))).not.toBeVisible();
        isBooked = false;
      } catch (error) {
        indexItem++;
        continue;
      }

      await buttonItem.tap();
      await element(by.id('ConfirmBookingButton')).tap();
      await element(by.id('MoviesTab')).tap();
      await expect(element(by.id(`Booked-${indexItem}`))).toBeVisible();
      await buttonItem.tap();
      await expect(element(by.text('Đã xem'))).toBeVisible();
      await element(by.id('BookingScreenBackButton')).tap();
    }
  });

  it('Case: khi nhấn "Yêu thích" sẽ chuyển trạng thái và thêm vào tab "Yêu thích"', async () => {
    let indexItem = 0;

    await element(by.id('MoviesTab')).tap();
    const eListCard = await element(by.id('MovieCard-movies'));
    const lstElement = await eListCard.getAttributes();
    const strAllLabel = (lstElement.elements?.[indexItem] ?? lstElement).label;
    const titleMovie = strAllLabel.split('Nội dung phim')[0].trim();

    await element(by.id(`UnFavorite-${indexItem}`)).tap();
    await expect(element(by.id(`Favorite-${indexItem}`))).toBeVisible();
    await element(by.id('FavoritesTab')).tap();
    await expect(element(by.id('MovieCard-favorite').withDescendant(by.text(titleMovie)))).toBeVisible();
  });

  it('Case: khi nhấn "Yêu thích" sẽ chuyển trạng thái và Nhấn lần nữa chuyển lại trạng Không thích', async () => {
    let indexItem = 0; // Tạm thời chỉ test 1 phim theo index, muốn chính xác hơn có thể test theo id của phim
    await element(by.id('MoviesTab')).tap();

    // Kiểm tra trạng thái hiện tại của phim
    let isFavorite = false;
    try {
      await expect(element(by.id(`Favorite-${indexItem}`))).toBeVisible();
      isFavorite = true;
    } catch (error) {
    }

    if (isFavorite) {
      await element(by.id(`Favorite-${indexItem}`)).tap();
      await expect(element(by.id(`UnFavorite-${indexItem}`))).toBeVisible();
      await element(by.id(`UnFavorite-${indexItem}`)).tap();
      await expect(element(by.id(`Favorite-${indexItem}`))).toBeVisible();
    } else {
      await element(by.id(`UnFavorite-${indexItem}`)).tap();
      await expect(element(by.id(`Favorite-${indexItem}`))).toBeVisible();
      await element(by.id(`Favorite-${indexItem}`)).tap();
      await expect(element(by.id(`UnFavorite-${indexItem}`))).toBeVisible();
    }
  });

  it('Case: khi nhấn bỏ "Yêu thích" sẽ chuyển trạng thái và mất khỏi tab "Yêu thích"', async () => {
    let indexItem = 0;

    await element(by.id('FavoritesTab')).tap();
    const eListCard = await element(by.id('MovieCard-favorite'));
    const lstElement = await eListCard.getAttributes();
    const strAllLabel = (lstElement.elements?.[indexItem] ?? lstElement).label;
    const titleMovie = strAllLabel.split('Nội dung phim')[0].trim();

    await element(by.id(`Favorite-${indexItem}`)).tap();
    await expect(element(by.id('MovieCard-favorite').withDescendant(by.text(titleMovie)))).not.toBeVisible();
  });


});

