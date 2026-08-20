data class Attack(val base: Int, val critical: Boolean, val element: String, val targetArmor: Int)

fun bonusFor(element: String): Int {
    if (element == "shadow") {
        return 11
    }
    if (element == "fire") {
        return 7
    }
    if (element == "ice") {
        return 5
    }
    return 0
}

fun damageOf(attack: Attack): Int {
    val armorReduction = attack.targetArmor / 2
    val criticalBonus = if (attack.critical) attack.base else 0
    val elementBonus = bonusFor(attack.element)

    val raw = attack.base + elementBonus + criticalBonus

    if (raw <= armorReduction) {
        return 1
    }

    return raw - armorReduction
}
